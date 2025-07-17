import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { TimelineMax, TweenMax, Power0 } from 'gsap';

const ImageTransitionComponent = ({ 
  images = [], 
  width = 800, 
  height = 600,
  autoPlay = true,
  duration = 3.0,
  delay = 1.0 
}) => {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    console.log('ImageTransitionComponent mounted with images:', images);
    
    if (!images || images.length < 2) {
      console.warn('ImageTransitionComponent: Need at least 2 images');
      return;
    }

    let root, slides = [], timeline, cleanupScrubber;

    const init = () => {
      // Create THREERoot equivalent
      root = {
        renderer: new THREE.WebGLRenderer({
          antialias: window.devicePixelRatio === 1,
          alpha: true
        }),
        camera: new THREE.PerspectiveCamera(80, width / height, 10, 100000),
        scene: new THREE.Scene(),
        controls: null
      };

      root.renderer.setClearColor(0x000000, 0);
      root.renderer.setPixelRatio(window.devicePixelRatio || 1);
      root.renderer.setSize(width, height);
      root.camera.position.set(0, 0, 60);

      // Remove controls for now
      // root.controls = new OrbitControls(root.camera, root.renderer.domElement);

      containerRef.current.appendChild(root.renderer.domElement);

      const slideWidth = 100;
      const slideHeight = 60;

      // Create slides for each image
      images.forEach((imageUrl, index) => {
        const animationPhase = index % 2 === 0 ? 'out' : 'in';
        const slide = createSlide(slideWidth, slideHeight, animationPhase);
        
        const loader = new THREE.ImageLoader();
        loader.setCrossOrigin('Anonymous');
        loader.load(imageUrl, (img) => {
          slide.setImage(img);
        });

        root.scene.add(slide);
        slides.push(slide);
      });

      // Create timeline
      timeline = new TimelineMax({
        repeat: autoPlay ? -1 : 0,
        repeatDelay: delay,
        yoyo: true
      });

      slides.forEach(slide => {
        timeline.add(slide.transition(), 0);
      });

      // Animation loop
      const animate = () => {
        // if (root.controls) root.controls.update();
        root.renderer.render(root.scene, root.camera);
        requestAnimationFrame(animate);
      };
      animate();

      // Mouse/touch controls for timeline scrubbing
      cleanupScrubber = createTweenScrubber(timeline);
    };

    const createSlide = (slideWidth, slideHeight, animationPhase) => {
      const plane = new THREE.PlaneGeometry(slideWidth, slideHeight, slideWidth * 2, slideHeight * 2);
      
      const geometry = new THREE.BufferGeometry();
      const positions = [];
      const uvs = [];
      const animations = [];
      const startPositions = [];
      const control0s = [];
      const control1s = [];
      const endPositions = [];

      const minDuration = 0.8;
      const maxDuration = 1.2;
      const maxDelayX = 0.9;
      const maxDelayY = 0.125;
      const stretch = 0.11;
      const totalDuration = maxDuration + maxDelayX + maxDelayY + stretch;

      // Get position and UV attributes from the plane geometry
      const positionAttr = plane.getAttribute('position');
      const uvAttr = plane.getAttribute('uv');
      const indexAttr = plane.getIndex();

      // Process triangles using the index buffer
      for (let i = 0; i < indexAttr.count; i += 3) {
        const a = indexAttr.getX(i);
        const b = indexAttr.getX(i + 1);
        const c = indexAttr.getX(i + 2);

        // Get vertices
        const vA = new THREE.Vector3().fromBufferAttribute(positionAttr, a);
        const vB = new THREE.Vector3().fromBufferAttribute(positionAttr, b);
        const vC = new THREE.Vector3().fromBufferAttribute(positionAttr, c);

        const centroid = new THREE.Vector3()
          .add(vA).add(vB).add(vC)
          .divideScalar(3);

        // Add triangle vertices
        positions.push(vA.x, vA.y, vA.z, vB.x, vB.y, vB.z, vC.x, vC.y, vC.z);
        
        // UV coordinates
        const uvA = new THREE.Vector2().fromBufferAttribute(uvAttr, a);
        const uvB = new THREE.Vector2().fromBufferAttribute(uvAttr, b);
        const uvC = new THREE.Vector2().fromBufferAttribute(uvAttr, c);

        uvs.push(
          uvA.x, uvA.y,
          uvB.x, uvB.y,
          uvC.x, uvC.y
        );

        // Animation parameters
        const duration = THREE.MathUtils.randFloat(minDuration, maxDuration);
        const delayX = THREE.MathUtils.mapLinear(centroid.x, -slideWidth * 0.5, slideWidth * 0.5, 0.0, maxDelayX);
        let delayY;
        
        if (animationPhase === 'in') {
          delayY = THREE.MathUtils.mapLinear(Math.abs(centroid.y), 0, slideHeight * 0.5, 0.0, maxDelayY);
        } else {
          delayY = THREE.MathUtils.mapLinear(Math.abs(centroid.y), 0, slideHeight * 0.5, maxDelayY, 0.0);
        }

        const animDelay = delayX + delayY + (Math.random() * stretch * duration);
        
        // Add animation data for each vertex of the triangle
        for (let v = 0; v < 3; v++) {
          animations.push(animDelay, duration);
          startPositions.push(centroid.x, centroid.y, centroid.z);
          
          // Control points for bezier curve
          const control0 = getControlPoint0(centroid, animationPhase);
          const control1 = getControlPoint1(centroid, animationPhase);
          
          control0s.push(control0.x, control0.y, control0.z);
          control1s.push(control1.x, control1.y, control1.z);
          endPositions.push(centroid.x, centroid.y, centroid.z);
        }
      }

      geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
      geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
      geometry.setAttribute('aAnimation', new THREE.Float32BufferAttribute(animations, 2));
      geometry.setAttribute('aStartPosition', new THREE.Float32BufferAttribute(startPositions, 3));
      geometry.setAttribute('aControl0', new THREE.Float32BufferAttribute(control0s, 3));
      geometry.setAttribute('aControl1', new THREE.Float32BufferAttribute(control1s, 3));
      geometry.setAttribute('aEndPosition', new THREE.Float32BufferAttribute(endPositions, 3));

      // Create material with custom shader
      const material = new THREE.ShaderMaterial({
        uniforms: {
          uTime: { value: 0 },
          map: { value: new THREE.Texture() }
        },
        vertexShader: `
          uniform float uTime;
          attribute vec2 aAnimation;
          attribute vec3 aStartPosition;
          attribute vec3 aControl0;
          attribute vec3 aControl1;
          attribute vec3 aEndPosition;
          varying vec2 vUv;
          
          vec3 cubicBezier(vec3 p0, vec3 p1, vec3 p2, vec3 p3, float t) {
            float u = 1.0 - t;
            return u * u * u * p0 + 3.0 * u * u * t * p1 + 3.0 * u * t * t * p2 + t * t * t * p3;
          }
          
          float easeInOutCubic(float t) {
            return t < 0.5 ? 4.0 * t * t * t : 1.0 - pow(-2.0 * t + 2.0, 3.0) / 2.0;
          }
          
          void main() {
            vUv = uv;
            
            float tDelay = aAnimation.x;
            float tDuration = aAnimation.y;
            float tTime = clamp(uTime - tDelay, 0.0, tDuration);
            float tProgress = easeInOutCubic(tTime / tDuration);
            
            vec3 transformed = position;
            ${animationPhase === 'in' ? 'transformed *= tProgress;' : 'transformed *= 1.0 - tProgress;'}
            transformed += cubicBezier(aStartPosition, aControl0, aControl1, aEndPosition, tProgress);
            
            gl_Position = projectionMatrix * modelViewMatrix * vec4(transformed, 1.0);
          }
        `,
        fragmentShader: `
          uniform sampler2D map;
          varying vec2 vUv;
          
          void main() {
            gl_FragColor = texture2D(map, vUv);
          }
        `,
        side: THREE.DoubleSide,
        transparent: true
      });

      const mesh = new THREE.Mesh(geometry, material);
      mesh.frustumCulled = false;
      mesh.totalDuration = totalDuration;

      mesh.setImage = function(image) {
        this.material.uniforms.map.value.image = image;
        this.material.uniforms.map.value.needsUpdate = true;
      };

      mesh.transition = function() {
        return TweenMax.fromTo(this.material.uniforms.uTime, duration, 
          { value: 0.0 }, 
          { value: this.totalDuration, ease: Power0.easeInOut }
        );
      };

      return mesh;
    };

    const getControlPoint0 = (centroid, animationPhase) => {
      const signY = Math.sign(centroid.y);
      const point = new THREE.Vector3(
        THREE.MathUtils.randFloat(0.1, 0.3) * 50,
        signY * THREE.MathUtils.randFloat(0.1, 0.3) * 70,
        THREE.MathUtils.randFloatSpread(20)
      );
      
      if (animationPhase === 'in') {
        return centroid.clone().sub(point);
      } else {
        return centroid.clone().add(point);
      }
    };

    const getControlPoint1 = (centroid, animationPhase) => {
      const signY = Math.sign(centroid.y);
      const point = new THREE.Vector3(
        THREE.MathUtils.randFloat(0.3, 0.6) * 50,
        -signY * THREE.MathUtils.randFloat(0.3, 0.6) * 70,
        THREE.MathUtils.randFloatSpread(20)
      );
      
      if (animationPhase === 'in') {
        return centroid.clone().sub(point);
      } else {
        return centroid.clone().add(point);
      }
    };

    const createTweenScrubber = (tween) => {
      const seekSpeed = 0.001;
      let mouseDown = false;
      let lastX = 0;

      const handleMouseDown = (e) => {
        mouseDown = true;
        lastX = e.clientX;
        tween.timeScale(0);
      };

      const handleMouseUp = () => {
        mouseDown = false;
        tween.timeScale(1);
      };

      const handleMouseMove = (e) => {
        if (!mouseDown) return;
        const dx = e.clientX - lastX;
        lastX = e.clientX;
        const progress = tween.progress();
        const newProgress = THREE.MathUtils.clamp(progress + (dx * seekSpeed), 0, 1);
        tween.progress(newProgress);
      };

      if (containerRef.current) {
        containerRef.current.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);
        window.addEventListener('mousemove', handleMouseMove);
      }

      return () => {
        if (containerRef.current) {
          containerRef.current.removeEventListener('mousedown', handleMouseDown);
        }
        window.removeEventListener('mouseup', handleMouseUp);
        window.removeEventListener('mousemove', handleMouseMove);
      };
    };

    init();

    return () => {
      if (cleanupScrubber) cleanupScrubber();
      if (root?.renderer) {
        containerRef.current?.removeChild(root.renderer.domElement);
        root.renderer.dispose();
      }
      if (timeline) timeline.kill();
    };
  }, [images, width, height, autoPlay, duration, delay]);

  return (
    <div 
      ref={containerRef}
      style={{
        width: width,
        height: height,
        background: 'radial-gradient(#666, #333)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div 
        style={{
          position: 'absolute',
          bottom: 0,
          width: '100%',
          textAlign: 'center',
          color: 'white',
          fontFamily: 'sans-serif',
          padding: '6px',
          pointerEvents: 'none',
          fontSize: '14px'
        }}
      >
        Click and drag to control the animation
      </div>
    </div>
  );
};

export default ImageTransitionComponent;