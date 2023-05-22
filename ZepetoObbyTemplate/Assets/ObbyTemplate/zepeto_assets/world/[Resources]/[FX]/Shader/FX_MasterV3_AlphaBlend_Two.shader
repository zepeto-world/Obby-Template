// Made with Amplify Shader Editor
// Available at the Unity Asset Store - http://u3d.as/y3X 
Shader "Particle/FX_MasterV3_AlphaBlend_Two"
{
	Properties
	{
		_Main_Texture("Main_Texture", 2D) = "white" {}
		_Main_U_Tiling("Main_U_Tiling", Float) = 1
		_Main_V_Tiling("Main_V_Tiling", Float) = 1
		_MainTex_U_Panning("MainTex_U_Panning", Float) = 0
		_MainTex_V_Panning("MainTex_V_Panning", Float) = 0
		_Distortion_Texture("Distortion_Texture", 2D) = "white" {}
		_Burn("Burn", Float) = 1
		_Distortion_Intensity("Distortion_Intensity", Float) = 0.2
		_Distortion_U_Panning("Distortion_U_Panning", Float) = 0
		_Distortion_V_Panning("Distortion_V_Panning", Float) = -0.2
		_Distortion_U_Tiling("Distortion_U_Tiling", Float) = 1
		_Distortion_V_Tiling("Distortion_V_Tiling", Float) = 1
		_Mask_Texture("Mask_Texture", 2D) = "white" {}
		_Mask_U_Tiling("Mask_U_Tiling", Float) = 1
		_Mask_V_Tiling("Mask_V_Tiling", Float) = 1
		_Dissolve("Dissolve", Float) = 0
		[Toggle]_Use_CustomData("Use_CustomData", Float) = 0
		_Dissolve_Texture("Dissolve_Texture", 2D) = "white" {}
		[HideInInspector] _texcoord( "", 2D ) = "white" {}
		[HideInInspector] _tex4coord3( "", 2D ) = "white" {}
		[HideInInspector] __dirty( "", Int ) = 1
	}

	SubShader
	{
		Tags{ "RenderType" = "Transparent"  "Queue" = "AlphaTest+0" "IgnoreProjector" = "True" "IsEmissive" = "true"  }
		Cull Off
		ZWrite Off
		Blend SrcAlpha OneMinusSrcAlpha , SrcAlpha OneMinusSrcAlpha
		
		CGPROGRAM
		#include "UnityShaderVariables.cginc"
		#pragma target 3.0
		#pragma surface surf Unlit keepalpha noshadow 
		#undef TRANSFORM_TEX
		#define TRANSFORM_TEX(tex,name) float4(tex.xy * name##_ST.xy + name##_ST.zw, tex.z, tex.w)
		struct Input
		{
			float4 uv3_tex4coord3;
			float2 uv_texcoord;
			float4 vertexColor : COLOR;
		};

		uniform float _Use_CustomData;
		uniform float _Burn;
		uniform sampler2D _Main_Texture;
		uniform sampler2D _Distortion_Texture;
		uniform float _Distortion_U_Tiling;
		uniform float _Distortion_V_Tiling;
		uniform float _Distortion_U_Panning;
		uniform float _Distortion_V_Panning;
		uniform float _Distortion_Intensity;
		uniform float _Main_U_Tiling;
		uniform float _Main_V_Tiling;
		uniform float _MainTex_U_Panning;
		uniform float _MainTex_V_Panning;
		uniform sampler2D _Dissolve_Texture;
		uniform float4 _Dissolve_Texture_ST;
		uniform float _Dissolve;
		uniform sampler2D _Mask_Texture;
		uniform float _Mask_U_Tiling;
		uniform float _Mask_V_Tiling;

		inline half4 LightingUnlit( SurfaceOutput s, half3 lightDir, half atten )
		{
			return half4 ( 0, 0, 0, s.Alpha );
		}

		void surf( Input i , inout SurfaceOutput o )
		{
			float4 appendResult84 = (float4(_Distortion_U_Tiling , _Distortion_V_Tiling , 0.0 , 0.0));
			float4 appendResult56 = (float4(_Distortion_U_Panning , _Distortion_V_Panning , 0.0 , 0.0));
			float2 panner45 = ( _Time.y * appendResult56.xy + float2( 0,0 ));
			float2 uv_TexCoord51 = i.uv_texcoord * appendResult84.xy + panner45;
			float4 appendResult87 = (float4(_Main_U_Tiling , _Main_V_Tiling , 0.0 , 0.0));
			float4 appendResult98 = (float4(_MainTex_U_Panning , _MainTex_V_Panning , 0.0 , 0.0));
			float2 panner99 = ( _Time.y * appendResult98.xy + float2( 0,0 ));
			float2 uv_TexCoord26 = i.uv_texcoord * appendResult87.xy + panner99;
			float4 tex2DNode25 = tex2D( _Main_Texture, ( ( UnpackNormal( tex2D( _Distortion_Texture, uv_TexCoord51 ) ) * (( _Use_CustomData )?( i.uv3_tex4coord3.y ):( _Distortion_Intensity )) ) + float3( uv_TexCoord26 ,  0.0 ) ).xy );
			o.Emission = ( (( _Use_CustomData )?( i.uv3_tex4coord3.x ):( _Burn )) * ( tex2DNode25 * i.vertexColor ) ).rgb;
			float2 uv_Dissolve_Texture = i.uv_texcoord * _Dissolve_Texture_ST.xy + _Dissolve_Texture_ST.zw;
			float clampResult140 = clamp( ( 1.0 - step( tex2D( _Dissolve_Texture, uv_Dissolve_Texture ).r , (( _Use_CustomData )?( i.uv3_tex4coord3.z ):( _Dissolve )) ) ) , 0.0 , 1.0 );
			float4 appendResult132 = (float4(_Mask_U_Tiling , _Mask_V_Tiling , 0.0 , 0.0));
			float2 appendResult131 = (float2(0.0 , (( _Use_CustomData )?( 0.0 ):( 0.0 ))));
			float2 uv_TexCoord133 = i.uv_texcoord * appendResult132.xy + appendResult131;
			o.Alpha = ( ( ( tex2DNode25.a * clampResult140 ) * i.vertexColor.a ) * tex2D( _Mask_Texture, uv_TexCoord133 ) ).r;
		}

		ENDCG
	}
	CustomEditor "ASEMaterialInspector"
}
/*ASEBEGIN
Version=18800
2161;119;1624;746;5695.84;167.7374;2.238332;True;True
Node;AmplifyShaderEditor.RangedFloatNode;34;-3581.056,-380.1262;Float;False;Property;_Distortion_U_Panning;Distortion_U_Panning;9;0;Create;True;0;0;0;False;0;False;0;0;0;0;0;1;FLOAT;0
Node;AmplifyShaderEditor.RangedFloatNode;31;-3581.056,-140.1262;Float;False;Property;_Distortion_V_Panning;Distortion_V_Panning;10;0;Create;True;0;0;0;False;0;False;-0.2;0.2;0;0;0;1;FLOAT;0
Node;AmplifyShaderEditor.DynamicAppendNode;56;-3309.056,-268.1262;Inherit;False;FLOAT4;4;0;FLOAT;0;False;1;FLOAT;0;False;2;FLOAT;0;False;3;FLOAT;0;False;1;FLOAT4;0
Node;AmplifyShaderEditor.RangedFloatNode;82;-3314.373,-548.1838;Float;False;Property;_Distortion_V_Tiling;Distortion_V_Tiling;12;0;Create;True;0;0;0;False;0;False;1;0.5;0;0;0;1;FLOAT;0
Node;AmplifyShaderEditor.SimpleTimeNode;53;-3289.198,-20.01037;Inherit;False;1;0;FLOAT;1;False;1;FLOAT;0
Node;AmplifyShaderEditor.RangedFloatNode;81;-3320.644,-807.5228;Float;False;Property;_Distortion_U_Tiling;Distortion_U_Tiling;11;0;Create;True;0;0;0;False;0;False;1;1;0;0;0;1;FLOAT;0
Node;AmplifyShaderEditor.RangedFloatNode;95;-3032.477,385.9257;Float;False;Property;_MainTex_V_Panning;MainTex_V_Panning;5;0;Create;True;0;0;0;False;0;False;0;0;0;0;0;1;FLOAT;0
Node;AmplifyShaderEditor.PannerNode;45;-3053.056,-188.1262;Inherit;False;3;0;FLOAT2;0,0;False;2;FLOAT2;0,0;False;1;FLOAT;1;False;1;FLOAT2;0
Node;AmplifyShaderEditor.DynamicAppendNode;84;-3078.153,-678.8557;Inherit;False;FLOAT4;4;0;FLOAT;0;False;1;FLOAT;0;False;2;FLOAT;0;False;3;FLOAT;0;False;1;FLOAT4;0
Node;AmplifyShaderEditor.RangedFloatNode;96;-3024.447,278.4252;Float;False;Property;_MainTex_U_Panning;MainTex_U_Panning;4;0;Create;True;0;0;0;False;0;False;0;0;0;0;0;1;FLOAT;0
Node;AmplifyShaderEditor.RangedFloatNode;86;-2578.994,227.7587;Float;False;Property;_Main_V_Tiling;Main_V_Tiling;3;0;Create;True;0;0;0;False;0;False;1;0.42;0;0;0;1;FLOAT;0
Node;AmplifyShaderEditor.TextureCoordinatesNode;123;-4680.504,199.1333;Inherit;False;2;-1;4;3;2;SAMPLER2D;;False;0;FLOAT2;1,1;False;1;FLOAT2;0,0;False;5;FLOAT4;0;FLOAT;1;FLOAT;2;FLOAT;3;FLOAT;4
Node;AmplifyShaderEditor.RangedFloatNode;38;-2748.394,-230.1269;Float;False;Property;_Distortion_Intensity;Distortion_Intensity;8;0;Create;True;0;0;0;False;0;False;0.2;2.2;0;0;0;1;FLOAT;0
Node;AmplifyShaderEditor.SimpleTimeNode;97;-2740.619,550.2078;Inherit;False;1;0;FLOAT;1;False;1;FLOAT;0
Node;AmplifyShaderEditor.TextureCoordinatesNode;51;-2788.133,-541.6959;Inherit;False;0;-1;2;3;2;SAMPLER2D;;False;0;FLOAT2;1,1;False;1;FLOAT2;0,0;False;5;FLOAT2;0;FLOAT;1;FLOAT;2;FLOAT;3;FLOAT;4
Node;AmplifyShaderEditor.DynamicAppendNode;98;-2760.477,302.0922;Inherit;False;FLOAT4;4;0;FLOAT;0;False;1;FLOAT;0;False;2;FLOAT;0;False;3;FLOAT;0;False;1;FLOAT4;0
Node;AmplifyShaderEditor.RangedFloatNode;85;-2585.264,-31.58029;Float;False;Property;_Main_U_Tiling;Main_U_Tiling;2;0;Create;True;0;0;0;False;0;False;1;2.66;0;0;0;1;FLOAT;0
Node;AmplifyShaderEditor.RangedFloatNode;134;-2551.49,962.2729;Float;False;Property;_Dissolve;Dissolve;16;0;Create;True;0;0;0;False;0;False;0;0.95;0;0;0;1;FLOAT;0
Node;AmplifyShaderEditor.ToggleSwitchNode;136;-2373.908,1080.474;Float;False;Property;_Use_CustomData;Use_CustomData;18;0;Create;True;0;0;0;False;0;False;0;2;0;FLOAT;0;False;1;FLOAT;0;False;1;FLOAT;0
Node;AmplifyShaderEditor.DynamicAppendNode;87;-2342.775,97.08658;Inherit;False;FLOAT4;4;0;FLOAT;0;False;1;FLOAT;0;False;2;FLOAT;0;False;3;FLOAT;0;False;1;FLOAT4;0
Node;AmplifyShaderEditor.ToggleSwitchNode;122;-2458.292,-185.2085;Float;False;Property;_Use_CustomData;Use_CustomData;15;0;Create;True;0;0;0;False;0;False;0;2;0;FLOAT;0;False;1;FLOAT;0;False;1;FLOAT;0
Node;AmplifyShaderEditor.SamplerNode;22;-2478.954,-407.8268;Inherit;True;Property;_Distortion_Texture;Distortion_Texture;6;0;Create;True;0;0;0;False;0;False;-1;0bebe40e9ebbecc48b8e9cfea982da7e;0bebe40e9ebbecc48b8e9cfea982da7e;True;0;True;white;Auto;True;Object;-1;Auto;Texture2D;8;0;SAMPLER2D;;False;1;FLOAT2;0,0;False;2;FLOAT;0;False;3;FLOAT2;0,0;False;4;FLOAT2;0,0;False;5;FLOAT;1;False;6;FLOAT;0;False;7;SAMPLERSTATE;;False;5;FLOAT3;0;FLOAT;1;FLOAT;2;FLOAT;3;FLOAT;4
Node;AmplifyShaderEditor.PannerNode;99;-2504.477,382.0922;Inherit;False;3;0;FLOAT2;0,0;False;2;FLOAT2;0,0;False;1;FLOAT;1;False;1;FLOAT2;0
Node;AmplifyShaderEditor.SamplerNode;135;-2499.759,757.1506;Inherit;True;Property;_Dissolve_Texture;Dissolve_Texture;17;0;Create;True;0;0;0;False;0;False;-1;None;None;True;0;False;white;Auto;False;Object;-1;Auto;Texture2D;8;0;SAMPLER2D;;False;1;FLOAT2;0,0;False;2;FLOAT;0;False;3;FLOAT2;0,0;False;4;FLOAT2;0,0;False;5;FLOAT;1;False;6;FLOAT;0;False;7;SAMPLERSTATE;;False;5;COLOR;0;FLOAT;1;FLOAT;2;FLOAT;3;FLOAT;4
Node;AmplifyShaderEditor.StepOpNode;141;-2135.52,785.2897;Inherit;True;2;0;FLOAT;0;False;1;FLOAT;0;False;1;FLOAT;0
Node;AmplifyShaderEditor.SimpleMultiplyOpNode;121;-2087.471,-327.3004;Inherit;False;2;2;0;FLOAT3;0,0,0;False;1;FLOAT;0;False;1;FLOAT3;0
Node;AmplifyShaderEditor.TextureCoordinatesNode;26;-2155.606,0.5081177;Inherit;False;0;-1;2;3;2;SAMPLER2D;;False;0;FLOAT2;1,1;False;1;FLOAT2;0,0;False;5;FLOAT2;0;FLOAT;1;FLOAT;2;FLOAT;3;FLOAT;4
Node;AmplifyShaderEditor.RangedFloatNode;126;-4667.467,945.9921;Float;False;Constant;_Mask_Panning_V;Mask_Panning_V;20;0;Create;True;0;0;0;False;0;False;0;0;0;0;0;1;FLOAT;0
Node;AmplifyShaderEditor.SimpleAddOpNode;24;-1807.387,53.86015;Inherit;False;2;2;0;FLOAT3;0,0,0;False;1;FLOAT2;0,0;False;1;FLOAT3;0
Node;AmplifyShaderEditor.RangedFloatNode;130;-4617.236,810.0563;Float;False;Constant;_Tile_U;Tile_U;19;0;Create;True;0;0;0;False;0;False;0;0;0;0;0;1;FLOAT;0
Node;AmplifyShaderEditor.RangedFloatNode;129;-4165.838,694.5369;Float;False;Property;_Mask_V_Tiling;Mask_V_Tiling;15;0;Create;True;0;0;0;False;0;False;1;0.5;0;0;0;1;FLOAT;0
Node;AmplifyShaderEditor.ToggleSwitchNode;128;-4389.858,924.4838;Float;False;Property;_Use_CustomData;Use_CustomData;19;0;Create;True;0;0;0;False;0;False;0;2;0;FLOAT;0;False;1;FLOAT;0;False;1;FLOAT;0
Node;AmplifyShaderEditor.RangedFloatNode;138;-1862.192,678.8046;Inherit;False;Constant;_Float1;Float 1;24;0;Create;True;0;0;0;False;0;False;0;0;0;0;0;1;FLOAT;0
Node;AmplifyShaderEditor.RangedFloatNode;139;-1849.823,765.3867;Inherit;False;Constant;_Float0;Float 0;24;0;Create;True;0;0;0;False;0;False;1;0;0;0;0;1;FLOAT;0
Node;AmplifyShaderEditor.RangedFloatNode;127;-4171.109,436.1978;Float;False;Property;_Mask_U_Tiling;Mask_U_Tiling;14;0;Create;True;0;0;0;False;0;False;1;1;0;0;0;1;FLOAT;0
Node;AmplifyShaderEditor.OneMinusNode;137;-1867.064,595.6393;Inherit;False;1;0;FLOAT;0;False;1;FLOAT;0
Node;AmplifyShaderEditor.DynamicAppendNode;132;-3928.618,564.8649;Inherit;False;FLOAT4;4;0;FLOAT;0;False;1;FLOAT;0;False;2;FLOAT;0;False;3;FLOAT;0;False;1;FLOAT4;0
Node;AmplifyShaderEditor.SamplerNode;25;-1644.566,63.71509;Inherit;True;Property;_Main_Texture;Main_Texture;0;0;Create;True;0;0;0;False;0;False;-1;None;None;True;0;False;white;Auto;False;Object;-1;Auto;Texture2D;8;0;SAMPLER2D;;False;1;FLOAT2;0,0;False;2;FLOAT;0;False;3;FLOAT2;0,0;False;4;FLOAT2;0,0;False;5;FLOAT;1;False;6;FLOAT;0;False;7;SAMPLERSTATE;;False;5;COLOR;0;FLOAT;1;FLOAT;2;FLOAT;3;FLOAT;4
Node;AmplifyShaderEditor.DynamicAppendNode;131;-4026.999,872.4763;Inherit;False;FLOAT2;4;0;FLOAT;0;False;1;FLOAT;0;False;2;FLOAT;0;False;3;FLOAT;0;False;1;FLOAT2;0
Node;AmplifyShaderEditor.ClampOpNode;140;-1629.402,584.5527;Inherit;False;3;0;FLOAT;0;False;1;FLOAT;0;False;2;FLOAT;1;False;1;FLOAT;0
Node;AmplifyShaderEditor.SimpleMultiplyOpNode;120;-1296.21,529.9896;Inherit;False;2;2;0;FLOAT;0;False;1;FLOAT;0;False;1;FLOAT;0
Node;AmplifyShaderEditor.RangedFloatNode;79;-1271.457,-134.4394;Float;False;Property;_Burn;Burn;7;0;Create;True;0;0;0;False;0;False;1;8.52;0;0;0;1;FLOAT;0
Node;AmplifyShaderEditor.VertexColorNode;76;-1396.147,266.905;Inherit;False;0;5;COLOR;0;FLOAT;1;FLOAT;2;FLOAT;3;FLOAT;4
Node;AmplifyShaderEditor.TextureCoordinatesNode;133;-3819.454,846.1152;Inherit;False;0;-1;2;3;2;SAMPLER2D;;False;0;FLOAT2;1,1;False;1;FLOAT2;0,0;False;5;FLOAT2;0;FLOAT;1;FLOAT;2;FLOAT;3;FLOAT;4
Node;AmplifyShaderEditor.SamplerNode;100;-3536.826,834.3309;Inherit;True;Property;_Mask_Texture;Mask_Texture;13;0;Create;True;0;0;0;False;0;False;-1;None;5228a04ef529d2641937cab585cc1a02;True;0;False;white;Auto;False;Object;-1;Auto;Texture2D;8;0;SAMPLER2D;;False;1;FLOAT2;0,0;False;2;FLOAT;0;False;3;FLOAT2;0,0;False;4;FLOAT2;0,0;False;5;FLOAT;1;False;6;FLOAT;0;False;7;SAMPLERSTATE;;False;5;COLOR;0;FLOAT;1;FLOAT;2;FLOAT;3;FLOAT;4
Node;AmplifyShaderEditor.ToggleSwitchNode;124;-1052.463,-140.5869;Float;False;Property;_Use_CustomData;Use_CustomData;16;0;Create;True;0;0;0;False;0;False;0;2;0;FLOAT;0;False;1;FLOAT;0;False;1;FLOAT;0
Node;AmplifyShaderEditor.SimpleMultiplyOpNode;77;-1040.153,100.1131;Inherit;False;2;2;0;COLOR;0,0,0,0;False;1;COLOR;0,0,0,0;False;1;COLOR;0
Node;AmplifyShaderEditor.SimpleMultiplyOpNode;78;-1122.521,318.7695;Inherit;False;2;2;0;FLOAT;0;False;1;FLOAT;0;False;1;FLOAT;0
Node;AmplifyShaderEditor.SimpleMultiplyOpNode;80;-776.8698,-1.589161;Inherit;False;2;2;0;FLOAT;0;False;1;COLOR;0,0,0,0;False;1;COLOR;0
Node;AmplifyShaderEditor.SimpleMultiplyOpNode;104;-817.5339,315.3332;Inherit;False;2;2;0;FLOAT;0;False;1;COLOR;0,0,0,0;False;1;COLOR;0
Node;AmplifyShaderEditor.StandardSurfaceOutputNode;75;-495.7512,91.84303;Float;False;True;-1;2;ASEMaterialInspector;0;0;Unlit;Particle/FX_MasterV3_AlphaBlend_Two;False;False;False;False;False;False;False;False;False;False;False;False;False;False;True;False;False;False;False;False;False;Off;2;False;-1;0;False;-1;False;0;False;-1;0;False;-1;False;0;Custom;0.5;True;False;0;True;Transparent;;AlphaTest;All;14;all;True;True;True;True;0;False;-1;False;0;False;-1;255;False;-1;255;False;-1;0;False;-1;0;False;-1;0;False;-1;0;False;-1;0;False;-1;0;False;-1;0;False;-1;0;False;-1;False;2;15;10;25;False;0.5;False;2;5;False;-1;10;False;-1;2;5;False;-1;10;False;-1;0;False;-1;0;False;-1;0;False;0;0,0,0,0;VertexOffset;True;False;Cylindrical;False;Relative;0;;1;-1;-1;-1;0;False;0;0;False;-1;-1;0;False;-1;0;0;0;False;0.1;False;-1;0;False;-1;False;15;0;FLOAT3;0,0,0;False;1;FLOAT3;0,0,0;False;2;FLOAT3;0,0,0;False;3;FLOAT;0;False;4;FLOAT;0;False;6;FLOAT3;0,0,0;False;7;FLOAT3;0,0,0;False;8;FLOAT;0;False;9;FLOAT;0;False;10;FLOAT;0;False;13;FLOAT3;0,0,0;False;11;FLOAT3;0,0,0;False;12;FLOAT3;0,0,0;False;14;FLOAT4;0,0,0,0;False;15;FLOAT3;0,0,0;False;0
WireConnection;56;0;34;0
WireConnection;56;1;31;0
WireConnection;45;2;56;0
WireConnection;45;1;53;0
WireConnection;84;0;81;0
WireConnection;84;1;82;0
WireConnection;51;0;84;0
WireConnection;51;1;45;0
WireConnection;98;0;96;0
WireConnection;98;1;95;0
WireConnection;136;0;134;0
WireConnection;136;1;123;3
WireConnection;87;0;85;0
WireConnection;87;1;86;0
WireConnection;122;0;38;0
WireConnection;122;1;123;2
WireConnection;22;1;51;0
WireConnection;99;2;98;0
WireConnection;99;1;97;0
WireConnection;141;0;135;1
WireConnection;141;1;136;0
WireConnection;121;0;22;0
WireConnection;121;1;122;0
WireConnection;26;0;87;0
WireConnection;26;1;99;0
WireConnection;24;0;121;0
WireConnection;24;1;26;0
WireConnection;128;0;126;0
WireConnection;137;0;141;0
WireConnection;132;0;127;0
WireConnection;132;1;129;0
WireConnection;25;1;24;0
WireConnection;131;0;130;0
WireConnection;131;1;128;0
WireConnection;140;0;137;0
WireConnection;140;1;138;0
WireConnection;140;2;139;0
WireConnection;120;0;25;4
WireConnection;120;1;140;0
WireConnection;133;0;132;0
WireConnection;133;1;131;0
WireConnection;100;1;133;0
WireConnection;124;0;79;0
WireConnection;124;1;123;1
WireConnection;77;0;25;0
WireConnection;77;1;76;0
WireConnection;78;0;120;0
WireConnection;78;1;76;4
WireConnection;80;0;124;0
WireConnection;80;1;77;0
WireConnection;104;0;78;0
WireConnection;104;1;100;0
WireConnection;75;2;80;0
WireConnection;75;9;104;0
ASEEND*/
//CHKSM=91A51D28528EF89EB7920103E8628493B04BE743