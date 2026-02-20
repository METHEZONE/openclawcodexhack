import os
from http import HTTPStatus
from dashscope import VideoSynthesis
import dashscope

dashscope.base_http_api_url = 'https://dashscope-intl.aliyuncs.com/api/v1'

api_key = os.getenv("DASHSCOPE_API_KEY", "sk-dc048b3279f243a38ace927113a4d024")

mycelia_prompt = """
A single luminous sphere floating centered in a pure black void. The orb has a glossy, fluid, glass-like surface with iridescent colors slowly shifting across it — deep purple, electric blue, soft cyan, and warm amber flowing like liquid metal across the reflective surface. The sphere slowly morphs and breathes, its surface rippling with organic wave distortions. Thin translucent particle mesh layers orbit just above the surface, made of thousands of tiny glowing points forming a delicate wireframe shell that undulates and pulses. Internal light glows from within, casting subtle volumetric rays. Extreme macro close-up shot, the orb fills the frame. Pure black background, no other elements. Smooth slow motion. Photorealistic 3D render quality. Minimal, hypnotic, meditative. Like a living digital soul suspended in darkness.
"""

print('Generating Mycelia soul orb video...')
print('This will take a few minutes...')

rsp = VideoSynthesis.call(
    api_key=api_key,
    model='wan2.6-t2v',
    prompt=mycelia_prompt,
    size="1280*720",
    duration=15,
    shot_type="multi",
    prompt_extend=True,
    watermark=True
)

print(rsp)

if rsp.status_code == HTTPStatus.OK:
    video_url = rsp.output.video_url
    print(f"\n✅ Video generated successfully!")
    print(f"Video URL: {video_url}")
else:
    print(f'\n❌ Failed to generate video')
    print(f'Status code: {rsp.status_code}')
    print(f'Code: {rsp.code}')
    print(f'Message: {rsp.message}')
