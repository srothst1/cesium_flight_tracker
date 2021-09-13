//This file is automatically rebuilt by the Cesium build process.
export default "czm_modelMaterial customShaderStage(czm_modelMaterial inputMaterial) \n\
{\n\
  #ifdef HAS_CUSTOM_FRAGMENT_SHADER\n\
  // FragmentInput and initializeInputStruct() are dynamically generated in JS, \n\
  // see CustomShaderStage.js\n\
  FragmentInput fsInput;\n\
  initializeInputStruct(fsInput);\n\
  czm_modelMaterial outputMaterial = inputMaterial;\n\
  fragmentMain(fsInput, outputMaterial);\n\
  return outputMaterial;\n\
  #else\n\
  return inputMaterial;\n\
  #endif\n\
}\n\
";
