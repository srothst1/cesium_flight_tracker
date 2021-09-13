//This file is automatically rebuilt by the Cesium build process.
export default "#if defined(HAS_NORMALS) && !defined(HAS_TANGENTS) && !defined(LIGHTING_UNLIT)\n\
    #ifdef GL_OES_standard_derivatives\n\
    #extension GL_OES_standard_derivatives : enable\n\
    #endif\n\
#endif\n\
\n\
czm_modelMaterial defaultModelMaterial()\n\
{\n\
    czm_modelMaterial material;\n\
    material.diffuse = vec3(1.0);\n\
    material.specular = vec3(0.04); // dielectric (non-metal)\n\
    material.roughness = 0.0;\n\
    material.occlusion = 1.0;\n\
    material.normal = vec3(0.0, 0.0, 1.0);\n\
    material.emissive = vec3(0.0);\n\
    material.alpha = 1.0;\n\
    return material;\n\
}\n\
\n\
vec4 handleAlpha(vec3 color, float alpha)\n\
{\n\
    #ifdef ALPHA_MODE_MASK\n\
    if (alpha < u_alphaCutoff) {\n\
        discard;\n\
    }\n\
    return vec4(color, 1.0);\n\
    #elif defined(ALPHA_MODE_BLEND)\n\
    return vec4(color, alpha);\n\
    #else // OPAQUE\n\
    return vec4(color, 1.0);\n\
    #endif\n\
}\n\
\n\
void main() \n\
{\n\
    czm_modelMaterial material = defaultModelMaterial();\n\
\n\
    #ifndef CUSTOM_SHADER_REPLACE_MATERIAL\n\
    material = materialStage(material);\n\
    #endif\n\
\n\
    #if defined(CUSTOM_SHADER_MODIFY_MATERIAL) || defined(CUSTOM_SHADER_REPLACE_MATERIAL) \n\
    material = customShaderStage(material);\n\
    #endif\n\
\n\
    material = lightingStage(material);\n\
\n\
    vec4 color = handleAlpha(material.diffuse, material.alpha);\n\
    gl_FragColor = color;\n\
}\n\
";
