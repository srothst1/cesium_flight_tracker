//This file is automatically rebuilt by the Cesium build process.
export default "vec3 customShaderStage(vec3 position) {\n\
  #ifdef COMPUTE_POSITION_WC\n\
  // needed so the fragment shader can set fsInput.positionWC\n\
  // Note that this is a 32-bit position which may result in jitter on small\n\
  // scales.\n\
  v_positionWC = (czm_model * vec4(position, 1.0)).xyz;\n\
  #endif\n\
\n\
  #ifdef HAS_CUSTOM_VERTEX_SHADER  \n\
  // VertexInput and initializeInputStruct() are dynamically generated in JS, \n\
  // see CustomShaderStage.js\n\
  VertexInput vsInput;\n\
  initializeInputStruct(vsInput);\n\
  vertexMain(vsInput, position);\n\
  #endif\n\
\n\
  return position;\n\
}\n\
";
