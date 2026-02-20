import os
from http import HTTPStatus
from dashscope import VideoSynthesis
import dashscope

dashscope.base_http_api_url = 'https://dashscope-intl.aliyuncs.com/api/v1'

api_key = os.getenv("DASHSCOPE_API_KEY", "sk-dc048b3279f243a38ace927113a4d024")

mushroom_prompt = """
Epic time-lapse of a fungal colony expanding and building civilization. Multiple mushroom types (Lion's mane with flowing tendrils, vibrant Cordyceps, glossy Reishi) emerge from dark soil, growing tall and interconnecting with mycelial networks like digital pathways. Each mushroom zone builds its own structures - crystal spires, glowing nodes, and biomechanical towers. The colonies merge and create mega-structures with pulsing energy. Golden and purple bioluminescent lights flow through the network. Overhead isometric view like a strategy game. Clash of Clans aesthetic with magical organism building mechanics. Extremely detailed, 4K quality, cinematic lighting, sci-fi meets nature.
"""

print('Generating your mushroom ecosystem video...')
print('This may take several minutes...')

rsp = VideoSynthesis.call(
    api_key=api_key,
    model='wan2.6-t2v',
    prompt=mushroom_prompt,
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
    print(f"\nYou can now use this video in your OpenClaw UI interface.")
else:
    print(f'\n❌ Failed to generate video')
    print(f'Status code: {rsp.status_code}')
    print(f'Code: {rsp.code}')
    print(f'Message: {rsp.message}')
