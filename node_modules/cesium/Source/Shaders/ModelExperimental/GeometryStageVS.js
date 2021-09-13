//This file is automatically rebuilt by the Cesium build process.
export default "void processPoints()\n\
{\n\
    gl_PointSize = 4.0;\n\
}\n\
\n\
vec3 processGeometry(vec3 position) \n\
{  \n\
    position = a_position;\n\
    v_position = position;\n\
    v_positionEC = (czm_modelView * vec4(position, 1.0)).xyz;\n\
\n\
    #ifdef HAS_NORMALS\n\
    v_normal = czm_normal * a_normal;\n\
    #endif\n\
\n\
    #ifdef HAS_TANGENTS\n\
    v_tangent.xyz = czm_normal * a_tangent.xyz;\n\
    v_tangent.w = a_tangent.w;\n\
    #endif\n\
\n\
    // This function is defined in GeometryPipelineStage\n\
    #ifdef HAS_SET_INDEXED_ATTRIBUTES\n\
    initializeSetIndexedAttributes();\n\
    #endif\n\
\n\
    // This function is defined in GeometryPipelineStage\n\
    #ifdef HAS_CUSTOM_ATTRIBUTES\n\
    initializeCustomAttributes();\n\
    #endif\n\
\n\
    return position;\n\
}\n\
";
