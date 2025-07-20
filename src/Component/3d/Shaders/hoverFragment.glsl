// src/3d/shaders/hoverFragment.glsl
uniform sampler2D uTexture;
uniform float uHover;
uniform float uTime;
varying vec2 vUv;

void main() {
  vec2 uv = vUv;
  float wave = sin(uv.y * 15.0 + uTime * 3.0) * 0.03 * uHover;
  uv.x += wave;
  vec4 color = texture2D(uTexture, uv);
  gl_FragColor = color;
}
