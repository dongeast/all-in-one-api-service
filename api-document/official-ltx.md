- 服务商：LTX Studio
- 官网：<https://www.ltx.studio/>
- 充值：<https://console.ltx.video/overview/>
- 修订日期：2026-04-07
- 备注：所有接口均为同步调用，必须等待api响应结果

### 目录

- [认证说明](#认证说明)
- [Video Generation](#video-generation)
  - [Generate video from text](#generate-video-from-text)
  - [Generate video from image](#generate-video-from-image)
  - [Generate video from audio](#generate-video-from-audio)
  - [Retake video section](#retake-video-section)
  - [Extend video duration](#extend-video-duration)
- [Http Status Code](#http-status-code)
- [Supported Models](#supported-models)
  - [Featured Models](#featured-models)
  - [Model Variants](#model-variants)
  - [Endpoint Compatibility](#endpoint-compatibility)
  - [Model Support Matrix](#model-support-matrix)
    - [LTX-2.3 Models](#ltx-23-models)
    - [LTX-2 Models](#ltx-2-models)
  - [Pricing](#pricing)

### 认证说明

LTX Video API 使用 Bearer Token 认证方式，所有API请求都需要在请求头中包含有效的API Key。

#### 获取 API Key

1. 访问 [LTX Video Console](https://console.ltx.video/overview/)
2. 注册或登录您的账户
3. 在控制台中生成或获取您的API Key

#### 认证方式

在所有API请求的Header中添加Authorization字段：

```
Authorization: Bearer YOUR_API_KEY
```

#### 请求示例

```bash
curl -X POST "https://api.ltx.video/v1/text-to-video" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "A beautiful sunset over mountains",
    "model": "ltx-2-3-pro",
    "duration": 8,
    "resolution": "1920x1080"
  }'
```

#### 注意事项

- **保密性**: 请妥善保管您的API Key，不要在公开场合泄露
- **权限控制**: API Key 具有账户级别的访问权限，请勿分享给他人
- **额度管理**: API调用会消耗账户余额，请确保账户有足够额度
- **速率限制**: 请遵守API的速率限制，避免频繁请求导致被限流

### Video Generation

#### Generate video from text

支持模型列表: ltx-2-fast、ltx-2-pro、ltx-2-3-fast、ltx-2-3-pro

1.Generate video from text(api_id: generate_video_from_text_task)

- url: <https://api.ltx.video/v1/text-to-video>
- type: POST
- request parameters:

| Name            | Type    | Required | Description                                        | Default Value | Constraints                                                                                                         |
| --------------- | ------- | -------- | -------------------------------------------------- | ------------- | ------------------------------------------------------------------------------------------------------------------- |
| Authorization   | string  | Yes      | API key authentication (Bearer token)              | -             | Header parameter, format: "Bearer YOUR_API_KEY"                                                                   |
| prompt          | string  | Yes      | Text prompt describing the desired video content   | -             | **<=5000 characters**                                                                                               |
| model           | string  | Yes      | Model to use for generation                        | -             | Options: "ltx-2-fast", "ltx-2-pro", "ltx-2-3-fast", "ltx-2-3-pro"                                                   |
| duration        | int     | Yes      | Video duration in seconds                          | -             | See Supported Models for available durations per model                                                              |
| resolution      | string  | Yes      | Output video resolution                            | -             | See Supported Models for available resolutions per model                                                            |
| fps             | int     | No       | Frame rate in frames per second                    | 24            | See Supported Models for available FPS per model and resolution                                                     |
| generate_audio | boolean | No       | Generate audio for the video                       | true          | When true, includes AI-generated audio; when false, only silent video                                               |
| camera_motion  | string  | No       | Apply camera motion effects to the generated video | -             | Options: "dolly_in", "dolly_out", "dolly_left", "dolly_right", "jib_up", "jib_down", "static", "focus_shift" |

- response parameters:

成功时直接返回视频文件（application/octet-stream），失败时返回JSON格式的错误信息。

错误响应格式：

| Name          | Type   | Description                          |
| ------------- | ------ | ------------------------------------ |
| type          | string | Response type indicator ("error")    |
| error         | object | Error details                        |
| error.type    | string | Error type for programmatic handling |
| error.message | string | Human-readable error description     |

- request example:

```shell
curl -X POST "https://api.ltx.video/v1/text-to-video" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "A majestic eagle soaring through clouds at sunset",
    "model": "ltx-2-3-pro",
    "duration": 8,
    "resolution": "1920x1080"
  }' \
  --output generated_video.mp4
```

- response example (success):

Binary video file (MP4 format)

- response example (error):

```json
{
  "type": "error",
  "error": {
    "type": "invalid_request_error",
    "message": "The request is invalid or malformed"
  }
}
```

#### Generate video from image

支持模型列表: ltx-2-fast、ltx-2-pro、ltx-2-3-fast、ltx-2-3-pro

1.Generate video from image(api_id:generate_video_from_image_task)

- url: <https://api.ltx.video/v1/image-to-video>
- type: POST
- request parameters:

| Name           | Type    | Required | Description                                                      | Default Value | Constraints                                                                                     |
| -------------- | ------- | -------- | ---------------------------------------------------------------- | ------------- | ----------------------------------------------------------------------------------------------- |
| Authorization  | string  | Yes      | API key authentication (Bearer token)                            | -             | Header parameter, format: "Bearer YOUR_API_KEY"                                                 |
| image_uri      | string  | Yes      | Image to be used as the first frame of the video                 | -             | See Input Formats for supported formats and size limits                                         |
| prompt         | string  | Yes      | Text description of how the image should be animated             | -             | Can relate to the details in the image                                                          |
| model          | string  | Yes      | Model to use for generation                                      | -             | Options: "ltx-2-fast", "ltx-2-pro", "ltx-2-3-fast", "ltx-2-3-pro"                               |
| duration       | int     | Yes      | Video duration in seconds                                        | -             | See Supported Models for available durations per model                                          |
| resolution     | string  | Yes      | Output video resolution                                          | -             | See Supported Models for available resolutions per model                                        |
| fps            | int     | No       | Frame rate in frames per second                                  | 24            | See Supported Models for available FPS per model and resolution                                 |
| generate_audio | boolean | No       | Generate audio for the video                                     | true          | When true, includes AI-generated audio; when false, only silent video                           |
| last_frame_uri | string  | No       | Image to be used as the last frame of the video                  | -             | Video will interpolate between first and last frame. **Only supported by ltx-2-3 models**       |
| camera_motion  | string  | No       | Apply camera motion effects to the generated video               | -             | Options: "dolly_in", "dolly_out", "dolly_left", "dolly_right", "jib_up", "jib_down", "static", "focus_shift" |

- response parameters:

成功时直接返回视频文件（application/octet-stream），失败时返回JSON格式的错误信息。

错误响应格式：

| Name        | Type   | Description                          |
| ----------- | ------ | ------------------------------------ |
| type        | string | Response type indicator ("error")    |
| error       | object | Error details                        |
| error.type  | string | Error type for programmatic handling |
| error.message | string | Human-readable error description   |

- request example:

```shell
curl -X POST "https://api.ltx.video/v1/image-to-video" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "image_uri": "https://example.com/sunset.jpg",
    "prompt": "Clouds drifting across the sky as the sun sets slowly",
    "model": "ltx-2-3-pro",
    "duration": 8,
    "resolution": "1920x1080"
  }' \
  --output generated_video.mp4
```

- response example (success):

Binary video file (MP4 format)

- response example (error):

```json
{
  "type": "error",
  "error": {
    "type": "invalid_request_error",
    "message": "The request is invalid or malformed"
  }
}
```

#### Generate video from audio

支持模型列表: ltx-2-pro、ltx-2-3-pro

1.Generate video from audio(api_id:generate_video_from_audio_task)

- url: <https://api.ltx.video/v1/audio-to-video>
- type: POST
- request parameters:

| Name           | Type    | Required | Description                                                      | Default Value | Constraints                                                                                     |
| -------------- | ------- | -------- | ---------------------------------------------------------------- | ------------- | ----------------------------------------------------------------------------------------------- |
| Authorization  | string  | Yes      | API key authentication (Bearer token)                            | -             | Header parameter, format: "Bearer YOUR_API_KEY"                                                 |
| audio_uri      | string  | Yes      | Audio file to be used as the soundtrack for the video            | -             | Duration must be between 2 and 20 seconds. See Input Formats for supported formats              |
| image_uri      | string  | No       | Input image to be used as the first frame of the video           | -             | Required if prompt is not provided. See Input Formats for supported formats                     |
| prompt         | string  | No       | Text description of how the video should be generated            | -             | Required if image_uri is not provided. Can be empty when image_uri is provided                  |
| resolution     | string  | No       | The resolution of the generated video in WIDTHxHEIGHT format     | Auto          | Options: "1920x1080" (landscape), "1080x1920" (portrait). Auto-determined by image orientation  |
| guidance_scale | double  | No       | Guidance scale (CFG) for video generation                        | 5 or 9        | Defaults to 5 for text-to-video, or 9 when providing an image                                   |
| model          | string  | No       | Model to use for video generation                                | ltx-2-3-pro   | Options: "ltx-2-pro", "ltx-2-3-pro" (Pro models only)                                           |

- response parameters:

成功时直接返回视频文件（application/octet-stream），失败时返回JSON格式的错误信息。

错误响应格式：

| Name          | Type   | Description                          |
| ------------- | ------ | ------------------------------------ |
| type          | string | Response type indicator ("error")    |
| error         | object | Error details                        |
| error.type    | string | Error type for programmatic handling |
| error.message | string | Human-readable error description     |

- request example:

```shell
curl -X POST "https://api.ltx.video/v1/audio-to-video" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "audio_uri": "https://example.com/audio.wav",
    "image_uri": "https://example.com/image.jpg",
    "prompt": "A beautiful sunset over mountains",
    "resolution": "1920x1080"
  }' \
  --output generated_video.mp4
```

- response example (success):

Binary video file (MP4 format)

- response example (error):

```json
{
  "type": "error",
  "error": {
    "type": "invalid_request_error",
    "message": "The request is invalid or malformed"
  }
}
```

#### Retake video section

支持模型列表: ltx-2-pro、ltx-2-3-pro

1.Retake video section(api_id: retake_video_section_task)

- url: <https://api.ltx.video/v1/retake>
- type: POST
- request parameters:

| Name          | Type    | Required | Description                                                      | Default Value             | Constraints                                                                                     |
| ------------- | ------- | -------- | ---------------------------------------------------------------- | ------------------------- | ----------------------------------------------------------------------------------------------- |
| Authorization | string  | Yes      | API key authentication (Bearer token)                            | -                         | Header parameter, format: "Bearer YOUR_API_KEY"                                                 |
| video_uri     | string  | Yes      | Input video for editing                                          | -                         | Max resolution: 3840x2160 (4K), Min frame count: 73 (around 3s at 24fps)                        |
| start_time    | double  | Yes      | Start time in seconds, defines the section to be edited          | -                         | Should be within the duration of the input video                                                |
| duration      | double  | Yes      | Duration in seconds, defines the duration of the section         | -                         | Must be at least 2 seconds. Section should be within video duration                             |
| prompt        | string  | No       | Describing what needs to happen in the generated video section   | -                         | Describes the content in the section defined by start_time and duration                         |
| mode          | string  | No       | Edit mode for the video section                                  | replace_audio_and_video   | Options: "replace_audio", "replace_video", "replace_audio_and_video"                            |
| resolution    | string  | No       | The resolution of the generated video in WIDTHxHEIGHT format     | Auto                      | Options: "1920x1080", "1080x1920". Auto-determined by input video orientation                   |
| model         | string  | No       | Model to use for video generation                                | ltx-2-3-pro               | Options: "ltx-2-pro", "ltx-2-3-pro" (Pro models only)                                           |

- response parameters:

成功时直接返回视频文件（application/octet-stream），失败时返回JSON格式的错误信息。

错误响应格式：

| Name          | Type   | Description                          |
| ------------- | ------ | ------------------------------------ |
| type          | string | Response type indicator ("error")    |
| error         | object | Error details                        |
| error.type    | string | Error type for programmatic handling |
| error.message | string | Human-readable error description     |

- request example:

```shell
curl -X POST "https://api.ltx.video/v1/retake" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "video_uri": "https://example.com/input.mp4",
    "prompt": "A dramatic explosion with bright orange flames",
    "start_time": 0,
    "duration": 5,
    "mode": "replace_audio_and_video"
  }' \
  --output edited_video.mp4
```

- response example (success):

Binary video file (MP4 format)

- response example (error):

```json
{
  "type": "error",
  "error": {
    "type": "invalid_request_error",
    "message": "The request is invalid or malformed"
  }
}
```

#### Extend video duration

支持模型列表: ltx-2-pro、ltx-2-3-pro

1.Extend video duration(api_id: extend_video_duration_task)

- url: <https://api.ltx.video/v1/extend>
- type: POST
- request parameters:

| Name          | Type    | Required | Description                                                      | Default Value | Constraints                                                                                     |
| ------------- | ------- | -------- | ---------------------------------------------------------------- | ------------- | ----------------------------------------------------------------------------------------------- |
| Authorization | string  | Yes      | API key authentication (Bearer token)                            | -             | Header parameter, format: "Bearer YOUR_API_KEY"                                                 |
| video_uri     | string  | Yes      | Input video for extending                                        | -             | Aspect ratios: 16:9 and 9:16. Max resolution: 3840x2160 (4K). Min frame count: 73 (~3s at 24fps)|
| duration      | double  | Yes      | Duration in seconds to extend the video                          | -             | Minimum 2 seconds, maximum 20 seconds (480 frames at 24fps)                                     |
| prompt        | string  | No       | Description of what should happen in the extended portion        | -             | Describes the content in the extended portion of the video                                      |
| mode          | string  | No       | Where to extend the video                                        | end           | Options: "end" (extends at the end), "start" (extends at the beginning)                         |
| model         | string  | No       | Model to use for video generation                                | ltx-2-3-pro   | Options: "ltx-2-pro", "ltx-2-3-pro" (Pro models only)                                           |
| context       | double  | No       | Number of seconds from input video to use as context             | Auto          | Max 20 seconds. Context + duration frames ≤ 505 frames (~21s at 24fps)                          |

- response parameters:

成功时直接返回视频文件（application/octet-stream），失败时返回JSON格式的错误信息。

错误响应格式：

| Name          | Type   | Description                          |
| ------------- | ------ | ------------------------------------ |
| type          | string | Response type indicator ("error")    |
| error         | object | Error details                        |
| error.type    | string | Error type for programmatic handling |
| error.message | string | Human-readable error description     |

- request example:

```shell
curl -X POST "https://api.ltx.video/v1/extend" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "video_uri": "https://example.com/input.mp4",
    "prompt": "Continue the motion smoothly",
    "duration": 5,
    "mode": "end",
    "model": "ltx-2-3-pro"
  }' \
  --output extended_video.mp4
```

- response example (success):

Binary video file (MP4 format)

- response example (error):

```json
{
  "type": "error",
  "error": {
    "type": "invalid_request_error",
    "message": "The request is invalid or malformed"
  }
}
```



### Http Status Code

All LTX Video API endpoints use standard HTTP status codes to indicate the success or failure of a request.

| Status Code | Description                              |
| ----------- | ---------------------------------------- |
| 200         | Request successful                          |
| 400         | The request is invalid or malformed      |
| 401         | Authentication failed                    |
| 422         | Content rejected by safety filters       |
| 429         | Rate limit exceeded                      |
| 500         | An unexpected error occurred             |
| 503         | Service temporarily unavailable          |
| 504         | Request timeout                          |

***

## Supported Models

Choose the right model for your use case. Explore all supported LTX models for text-to-video, image-to-video, and other generation tasks.

Reference: https://docs.ltx.video/models

The LTX API offers video generation powered by **LTX-2.3** — portrait and landscape up to 4K, cinematic frame rates, and first-to-last frame control. Models are available in **Fast** and **Pro** variants.

### Featured Models

**LTX-2.3**
- Portrait and landscape video up to 4K
- Cinematic frame rates (24/48 fps)
- First-to-last frame control for image-to-video
- Sharp detail with accurate prompt handling

**LTX-2**
- Landscape video up to 4K at 25/50 fps
- Synchronized audio generation

### Model Variants

**Fast**
- Optimized for speed and low cost
- Best for rapid prototyping, brainstorming, storyboarding, and quick iteration
- Supports longer durations (up to 20s at 1080p/25fps)

**Pro**
- Higher fidelity with better motion stability and visual detail
- Best for final renders and commercial-grade output
- Required for audio-to-video, retake, and extend endpoints

> **Tip:** Start with Fast to explore compositions quickly, then switch to Pro for the final render.

### Endpoint Compatibility

Not every endpoint supports every model. Audio-to-video, retake, and extend require a Pro model.

| Endpoint       | Fast | Pro |
| -------------- | ---- | --- |
| text-to-video  | ✓    | ✓   |
| image-to-video | ✓    | ✓   |
| audio-to-video | —    | ✓   |
| retake         | —    | ✓   |
| extend         | —    | ✓   |

### Model Support Matrix

Resolutions, FPS values, and duration options supported by each model.

#### LTX-2.3 Models

**ltx-2-3-fast**

| Resolution | FPS            | Duration (seconds)           |
| ---------- | -------------- | ---------------------------- |
| 1080p      | 24, 25         | 6, 8, 10, 12, 14, 16, 18, 20 |
| 1080p      | 48, 50         | 6, 8, 10                     |
| 1440p      | 24, 25, 48, 50 | 6, 8, 10                     |
| 4K         | 24, 25, 48, 50 | 6, 8, 10                     |

**ltx-2-3-pro**

| Resolution | FPS            | Duration (seconds) |
| ---------- | -------------- | ------------------ |
| 1080p      | 24, 25, 48, 50 | 6, 8, 10           |
| 1440p      | 24, 25, 48, 50 | 6, 8, 10           |
| 4K         | 24, 25, 48, 50 | 6, 8, 10           |

**Aspect Ratios:** 16:9 (landscape) and 9:16 (portrait)

| Resolution | 16:9 (landscape) | 9:16 (portrait) |
| ---------- | ---------------- | --------------- |
| 1080p      | 1920x1080        | 1080x1920       |
| 1440p      | 2560x1440        | 1440x2560       |
| 4K         | 3840x2160        | 2160x3840       |

#### LTX-2 Models

**ltx-2-fast**

| Resolution | FPS    | Duration (seconds)           |
| ---------- | ------ | ---------------------------- |
| 1080p      | 25     | 6, 8, 10, 12, 14, 16, 18, 20 |
| 1080p      | 50     | 6, 8, 10                     |
| 1440p      | 25, 50 | 6, 8, 10                     |
| 4K         | 25, 50 | 6, 8, 10                     |

**ltx-2-pro**

| Resolution | FPS    | Duration (seconds) |
| ---------- | ------ | ------------------ |
| 1080p      | 25, 50 | 6, 8, 10           |
| 1440p      | 25, 50 | 6, 8, 10           |
| 4K         | 25, 50 | 6, 8, 10           |

**Aspect Ratio:** 16:9 (landscape) only

| Resolution | API Value   |
| ---------- | ----------- |
| 1080p      | 1920x1080   |
| 1440p      | 2560x1440   |
| 4K         | 3840x2160   |

### Pricing

For per-second pricing by model and resolution, see the [Pricing](https://console.ltx.video/overview/) page.

