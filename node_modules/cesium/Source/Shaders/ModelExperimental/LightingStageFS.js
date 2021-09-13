//This file is automatically rebuilt by the Cesium build process.
export default "vec3 LINEARtoSRGB(vec3 linearIn) \n\
{\n\
    #ifndef HDR \n\
    return pow(linearIn, vec3(1.0/2.2));\n\
    #else \n\
    return linearIn;\n\
    #endif \n\
}\n\
\n\
#ifdef LIGHTING_PBR\n\
vec3 applyTonemapping(vec3 linearIn) \n\
{\n\
    #ifndef HDR \n\
    return czm_acesTonemapping(linearIn);\n\
    #else \n\
    return linearIn;\n\
    #endif \n\
}\n\
\n\
vec3 computePbrLighting(czm_modelMaterial inputMaterial)\n\
{\n\
    czm_pbrParameters pbrParameters;\n\
    pbrParameters.diffuseColor = inputMaterial.diffuse;\n\
    pbrParameters.f0 = inputMaterial.specular;\n\
    pbrParameters.roughness = inputMaterial.roughness;\n\
    \n\
    vec3 lightColorHdr = czm_lightColorHdr;\n\
\n\
    vec3 color = inputMaterial.diffuse;\n\
    #ifdef HAS_NORMALS\n\
    color = czm_pbrLighting(\n\
        v_positionEC,\n\
        inputMaterial.normal,\n\
        czm_lightDirectionEC,\n\
        lightColorHdr,\n\
        pbrParameters\n\
    );\n\
    #endif\n\
\n\
    color *= inputMaterial.occlusion;\n\
    color += inputMaterial.emissive;\n\
\n\
    // Convert high-dynamic range to low-dynamic range in HDR mode\n\
    color = applyTonemapping(color);\n\
    return color;\n\
}\n\
#endif\n\
\n\
\n\
czm_modelMaterial lightingStage(czm_modelMaterial inputMaterial)\n\
{\n\
    // Even though the lighting will only set the diffuse color,\n\
    // pass all other properties too so further stages have access to them.\n\
    czm_modelMaterial outputMaterial = inputMaterial;\n\
    vec3 color = vec3(0.0);\n\
\n\
    #ifdef LIGHTING_PBR\n\
    color = computePbrLighting(inputMaterial);\n\
    #else // unlit\n\
    color = inputMaterial.diffuse;\n\
    #endif\n\
\n\
    color = LINEARtoSRGB(color);\n\
\n\
    outputMaterial.diffuse = color;\n\
    return outputMaterial;\n\
}\n\
";
