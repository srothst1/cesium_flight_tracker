//This file is automatically rebuilt by the Cesium build process.
export default "uniform float u_noiseTextureLength;\n\
attribute vec2 position;\n\
\n\
varying vec2 v_position;\n\
\n\
void main()\n\
{\n\
    gl_Position = vec4(position, 0.1, 1.0);\n\
\n\
    vec2 transformedPos = (position / 2.0) + vec2(0.5);\n\
    transformedPos *= u_noiseTextureLength;\n\
    transformedPos.x *= u_noiseTextureLength;\n\
    v_position = transformedPos;\n\
}\n\
";
