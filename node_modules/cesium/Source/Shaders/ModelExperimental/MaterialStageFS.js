//This file is automatically rebuilt by the Cesium build process.
export default "vec3 SRGBtoLINEAR3(vec3 srgbIn) \n\
{\n\
    return pow(srgbIn, vec3(2.2));\n\
}\n\
\n\
vec4 SRGBtoLINEAR4(vec4 srgbIn) \n\
{\n\
    vec3 linearOut = pow(srgbIn.rgb, vec3(2.2));\n\
    return vec4(linearOut, srgbIn.a);\n\
}\n\
\n\
vec2 computeTextureTransform(vec2 texCoord, mat3 textureTransform)\n\
{\n\
    return vec2(textureTransform * vec3(texCoord, 1.0));\n\
}\n\
\n\
#ifdef HAS_NORMALS\n\
vec3 computeNormal()\n\
{\n\
    vec3 ng = normalize(v_normal);\n\
\n\
    vec3 normal = ng;\n\
    #ifdef HAS_NORMAL_TEXTURE\n\
    vec2 normalTexCoords = TEXCOORD_NORMAL;\n\
        #ifdef HAS_NORMAL_TEXTURE_TRANSFORM\n\
        normalTexCoords = computeTextureTransform(normalTexCoords, u_normalTextureTransform);\n\
        #endif\n\
\n\
        #ifdef HAS_TANGENTS\n\
        // read tangents from varying\n\
        vec3 t = normalize(v_tangent.xyz);\n\
        vec3 b = normalize(cross(ng, t) * v_tangent.w);\n\
        mat3 tbn = mat3(t, b, ng);\n\
        vec3 n = texture2D(u_normalTexture, normalTexCoords).rgb;\n\
        normal = normalize(tbn * (2.0 * n - 1.0));\n\
        #elif defined(GL_OES_standard_derivatives)\n\
        // Compute tangents\n\
        vec3 pos_dx = dFdx(v_positionEC);\n\
        vec3 pos_dy = dFdy(v_positionEC);\n\
        vec3 tex_dx = dFdx(vec3(normalTexCoords,0.0));\n\
        vec3 tex_dy = dFdy(vec3(normalTexCoords,0.0));\n\
        vec3 t = (tex_dy.t * pos_dx - tex_dx.t * pos_dy) / (tex_dx.s * tex_dy.t - tex_dy.s * tex_dx.t);\n\
        t = normalize(t - ng * dot(ng, t));\n\
        vec3 b = normalize(cross(ng, t));\n\
        mat3 tbn = mat3(t, b, ng);\n\
        vec3 n = texture2D(u_normalTexture, normalTexCoords).rgb;\n\
        normal = normalize(tbn * (2.0 * n - 1.0));\n\
        #endif\n\
    #endif\n\
\n\
    return normal;\n\
}\n\
#endif\n\
\n\
czm_modelMaterial materialStage(czm_modelMaterial inputMaterial)\n\
{\n\
    czm_modelMaterial material = inputMaterial;\n\
\n\
    #ifdef HAS_NORMALS\n\
    material.normal = computeNormal();\n\
    #endif\n\
\n\
    vec4 baseColorWithAlpha = vec4(1.0);\n\
    // Regardless of whether we use PBR, set a base color\n\
    #ifdef HAS_BASE_COLOR_TEXTURE\n\
    vec2 baseColorTexCoords = TEXCOORD_BASE_COLOR;\n\
\n\
        #ifdef HAS_BASE_COLOR_TEXTURE_TRANSFORM\n\
        baseColorTexCoords = computeTextureTransform(baseColorTexCoords, u_baseColorTextureTransform);\n\
        #endif\n\
\n\
    baseColorWithAlpha = SRGBtoLINEAR4(texture2D(u_baseColorTexture, baseColorTexCoords));\n\
\n\
        #ifdef HAS_BASE_COLOR_FACTOR\n\
        baseColorWithAlpha *= u_baseColorFactor;\n\
        #endif\n\
    #elif defined(HAS_BASE_COLOR_FACTOR)\n\
    baseColorWithAlpha = u_baseColorFactor;\n\
    #endif\n\
\n\
    #ifdef HAS_COLOR_0\n\
    baseColorWithAlpha *= v_color_0;\n\
    #endif\n\
\n\
    material.diffuse = baseColorWithAlpha.rgb;\n\
    material.alpha = baseColorWithAlpha.a;\n\
\n\
    #ifdef HAS_OCCLUSION_TEXTURE\n\
    vec2 occlusionTexCoords = TEXCOORD_OCCLUSION;\n\
        #ifdef HAS_OCCLUSION_TEXTURE_TRANSFORM\n\
        occlusionTexCoords = computeTextureTransform(occlusionTexCoords, u_occlusionTextureTransform);\n\
        #endif\n\
    material.occlusion = texture2D(u_occlusionTexture, occlusionTexCoords).r;\n\
    #endif\n\
\n\
    #ifdef HAS_EMISSIVE_TEXTURE\n\
    vec2 emissiveTexCoords = TEXCOORD_EMISSIVE;\n\
        #ifdef HAS_EMISSIVE_TEXTURE_TRANSFORM\n\
        emissiveTexCoords = computeTextureTransform(emissiveTexCoords, u_emissiveTextureTransform);\n\
        #endif\n\
\n\
    vec3 emissive = SRGBtoLINEAR3(texture2D(u_emissiveTexture, emissiveTexCoords).rgb);\n\
        #ifdef HAS_EMISSIVE_FACTOR\n\
        emissive *= u_emissiveFactor;\n\
        #endif\n\
    material.emissive = emissive;\n\
    #elif defined(HAS_EMISSIVE_FACTOR)\n\
    material.emissive = u_emissiveFactor;\n\
    #endif\n\
\n\
    #if defined(LIGHTING_PBR) && defined(USE_SPECULAR_GLOSSINESS)\n\
        #ifdef HAS_SPECULAR_GLOSSINESS_TEXTURE\n\
        vec2 specularGlossinessTexCoords = TEXCOORD_SPECULAR_GLOSSINESS;\n\
          #ifdef HAS_SPECULAR_GLOSSINESS_TEXTURE_TRANSFORM\n\
          specularGlossinessTexCoords = computeTextureTransform(specularGlossinessTexCoords, u_specularGlossinessTextureTransform);\n\
          #endif\n\
\n\
        vec4 specularGlossiness = SRGBtoLINEAR4(texture2D(u_specularGlossinessTexture, specularGlossinessTexCoords));\n\
        vec3 specular = specularGlossiness.rgb;\n\
        float glossiness = specularGlossiness.a;\n\
            #ifdef HAS_SPECULAR_FACTOR\n\
            specular *= u_specularFactor;\n\
            #endif\n\
\n\
            #ifdef HAS_GLOSSINESS_FACTOR\n\
            glossiness *= u_glossinessFactor;\n\
            #endif\n\
        #else\n\
            #ifdef HAS_SPECULAR_FACTOR\n\
            vec3 specular = clamp(u_specularFactor, vec3(0.0), vec3(1.0));\n\
            #else\n\
            vec3 specular = vec3(1.0);\n\
            #endif\n\
\n\
            #ifdef HAS_GLOSSINESS_FACTOR\n\
            float glossiness = clamp(u_glossinessFactor, 0.0, 1.0);\n\
            #else\n\
            float glossiness = 1.0;\n\
            #endif\n\
        #endif\n\
\n\
        #ifdef HAS_DIFFUSE_TEXTURE\n\
        vec2 diffuseTexCoords = TEXCOORD_DIFFUSE;\n\
            #ifdef HAS_DIFFUSE_TEXTURE_TRANSFORM\n\
            diffuseTexCoords = computeTextureTransform(diffuseTexCoords, u_diffuseTextureTransform);\n\
            #endif\n\
\n\
        vec4 diffuse = SRGBtoLINEAR4(texture2D(u_diffuseTexture, diffuseTexCoords));\n\
            #ifdef HAS_DIFFUSE_FACTOR\n\
            diffuse *= u_diffuseFactor;\n\
            #endif\n\
        #elif defined(HAS_DIFFUSE_FACTOR)\n\
        vec4 diffuse = clamp(u_diffuseFactor, vec4(0.0), vec4(1.0));\n\
        #else\n\
        vec4 diffuse = vec4(1.0);\n\
        #endif\n\
    czm_pbrParameters parameters = czm_pbrSpecularGlossinessMaterial(\n\
      diffuse.rgb,\n\
      specular,\n\
      glossiness\n\
    );\n\
    material.diffuse = parameters.diffuseColor;\n\
    material.specular = parameters.f0;\n\
    material.roughness = parameters.roughness;\n\
    #elif defined(LIGHTING_PBR)\n\
        #ifdef HAS_METALLIC_ROUGHNESS_TEXTURE\n\
        vec2 metallicRoughnessTexCoords = TEXCOORD_METALLIC_ROUGHNESS;\n\
            #ifdef HAS_METALLIC_ROUGHNESS_TEXTURE_TRANSFORM\n\
            metallicRoughnessTexCoords = computeTextureTransform(metallicRoughnessTexCoords, u_metallicRoughnessTextureTransform);\n\
            #endif\n\
\n\
        vec3 metallicRoughness = texture2D(u_metallicRoughnessTexture, metallicRoughnessTexCoords).rgb;\n\
        float metalness = clamp(metallicRoughness.b, 0.0, 1.0);\n\
        float roughness = clamp(metallicRoughness.g, 0.04, 1.0);\n\
            #ifdef HAS_METALLIC_FACTOR\n\
            metalness *= u_metallicFactor;\n\
            #endif\n\
\n\
            #ifdef HAS_ROUGHNESS_FACTOR\n\
            roughness *= u_roughnessFactor;\n\
            #endif\n\
        #else\n\
            #ifdef HAS_METALLIC_FACTOR\n\
            float metalness = clamp(u_metallicFactor, 0.0, 1.0);\n\
            #else\n\
            float metalness = 1.0;\n\
            #endif\n\
\n\
            #ifdef HAS_ROUGHNESS_FACTOR\n\
            float roughness = clamp(u_roughnessFactor, 0.04, 1.0);\n\
            #else\n\
            float roughness = 1.0;\n\
            #endif\n\
        #endif\n\
    czm_pbrParameters parameters = czm_pbrMetallicRoughnessMaterial(\n\
      material.diffuse,\n\
      metalness,\n\
      roughness\n\
    );\n\
    material.diffuse = parameters.diffuseColor;\n\
    material.specular = parameters.f0;\n\
    material.roughness = parameters.roughness;\n\
    #endif\n\
\n\
    return material;\n\
}";
