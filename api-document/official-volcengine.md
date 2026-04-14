- 服务商：火山引擎
- 官网：<https://www.volcengine.com/>
- 充值：<https://console.volcengine.com/ark/region:ark+cn-beijing/apiKey>
- 修订日期：2026-04-08

### 目录

- [认证说明](#认证说明)
- [Image Generation](#image-generation)
  - [Generate Image](#generate-image)
- [Video Generation](#video-generation)
  - [Create Video Generation Task](#create-video-generation-task)
  - [Query Video Generation Task](#query-video-generation-task)
  - [Query Video Generation Task List](#query-video-generation-task-list)
  - [Cancel or Delete Video Generation Task](#cancel-or-delete-video-generation-task)
- [3D Generation](#3d-generation)
  - [Create 3D Generation Task](#create-3d-generation-task)
  - [Query 3D Generation Task](#query-3d-generation-task)
  - [Query 3D Generation Task List](#query-3d-generation-task-list)
  - [Cancel or Delete 3D Generation Task](#cancel-or-delete-3d-generation-task)
- [Error Code](#error-code)
- [Supported Models](#supported-models)

### 认证说明

火山引擎 API 使用 API Key 鉴权方式，所有API请求都需要在请求头中包含有效的API Key。

#### 获取 API Key

1. 访问 [火山引擎控制台](https://console.volcengine.com/ark/region:ark+cn-beijing/apiKey)
2. 注册或登录您的账户
3. 在控制台中生成或获取您的API Key

#### 认证方式

在所有API请求的Header中添加Authorization字段：

```
Authorization: Bearer YOUR_API_KEY
```

#### 请求示例

```bash
curl -X POST "https://ark.cn-beijing.volces.com/api/v3/images/generations" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "doubao-seedream-5-0-260128",
    "prompt": "A beautiful sunset over mountains",
    "size": "2048x2048"
  }'
```

#### 注意事项

- **保密性**: 请妥善保管您的API Key，不要在公开场合泄露
- **权限控制**: API Key 具有账户级别的访问权限，请勿分享给他人
- **额度管理**: API调用会消耗账户余额，请确保账户有足够额度
- **速率限制**: 请遵守API的速率限制，避免频繁请求导致被限流

### Image Generation

#### Generate Image

支持模型列表: doubao-seedream-5-0-260128、doubao-seedream-4-5-251128、doubao-seedream-4-0-250828、doubao-seedream-3-0-t2i-250415

1.Generate Image(api\_id: generate\_image\_task)

- url: <https://ark.cn-beijing.volces.com/api/v3/images/generations>
- type: POST
- request parameters:

| Name                                   | Type         | Required | Description                                                | Default Value | Constraints                                                                                                                       |
| -------------------------------------- | ------------ | -------- | ---------------------------------------------------------- | ------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| model                                  | string       | Yes      | Model ID or Endpoint ID for this request                   | -             | -                                                                                                                                 |
| prompt                                 | string       | Yes      | Prompt for generating images, supports Chinese and English | -             | Recommended max 300 Chinese characters or 600 English words                                                                       |
| image                                  | string/array | No       | Input image information, supports URL or Base64 encoding   | -             | Supported formats: jpeg, png, webp, bmp, tiff, gif. Max 10MB. doubao-seedream-5-0-260128/4-5-251128/4-0-250828 supports up to 14 reference images |
| size                                   | string       | No       | Specify the size of the generated image                    | 2048x2048     | See model-specific size options below                                                                                             |
| seed                                   | integer | No       | Random seed for controlling generation randomness          | -1            | Range: \[-1, 2147483647]. Only for doubao-seedream-3-0-t2i-250415                                                                        |
| sequential\_image\_generation          | string | No       | Control whether to enable sequential image generation      | disabled      | Options: "auto", "disabled". Only for doubao-seedream-5-0-260128/4-5-251128/4-0-250828                                                            |
| sequential\_image\_generation\_options | object       | No       | Configuration for sequential image generation              | -             | Only effective when sequential\_image\_generation is "auto"                                                                       |
| stream                                 | boolean | No       | Control whether to enable streaming output mode            | false         | Only for doubao-seedream-5-0-260128/4-5-251128/4-0-250828                                                                                         |
| guidance\_scale                        | float | No       | Consistency between model output and prompt                | 2.5           | Range: \[1, 10]. Only for doubao-seedream-3-0-t2i-250415                                                                                 |
| output\_format                         | string | No       | Specify the file format of the generated image             | jpeg          | Options: "png", "jpeg". Only for doubao-seedream-5-0-260128                                                                         |
| response\_format                       | string       | No       | Specify the return format of the generated image           | url           | Options: "url", "b64\_json"                                                                                                       |
| watermark                              | boolean      | No       | Whether to add watermark to the generated image            | true          | -                                                                                                                                 |
| optimize\_prompt\_options              | object | No       | Configuration for prompt optimization feature              | -             | Only for doubao-seedream-5-0-260128/4-5-251128/4-0-250828                                                                                         |

- Size Options by Model:

**doubao-seedream-5-0-260128:**

- Method 1: Specify resolution ("2K", "3K") and describe aspect ratio in prompt
- Method 2: Specify width x height pixels
  - Total pixel range: \[2560x1440=3686400, 3072x3072x1.1025=10404496]
  - Aspect ratio range: \[1/16, 16]

**doubao-seedream-4-5-251128:**

- Method 1: Specify resolution ("2K", "4K") and describe aspect ratio in prompt
- Method 2: Specify width x height pixels
  - Total pixel range: \[2560x1440=3686400, 4096x4096=16777216]
  - Aspect ratio range: \[1/16, 16]

**doubao-seedream-4-0-250828:**

- Method 1: Specify resolution ("1K", "2K", "4K") and describe aspect ratio in prompt
- Method 2: Specify width x height pixels
  - Total pixel range: \[1280x720=921600, 4096x4096=16777216]
  - Aspect ratio range: \[1/16, 16]

**doubao-seedream-3-0-t2i-250415:**

- Specify width x height pixels
  - Default: 1024x1024
  - Range: \[512x512, 2048x2048]
- Recommended Size Values:

| Resolution | Aspect Ratio | Pixel Size |
| ---------- | ------------ | ---------- |
| 1K         | 1:1          | 1024x1024  |
| 1K         | 16:9         | 1280x720   |
| 1K         | 9:16         | 720x1280   |
| 2K         | 1:1          | 2048x2048  |
| 2K         | 16:9         | 2848x1600  |
| 2K         | 9:16         | 1600x2848  |
| 4K         | 1:1          | 4096x4096  |
| 4K         | 16:9         | 5504x3040  |
| 4K         | 9:16         | 3040x5504  |

- response parameters:

| Name                    | Type    | Description                                                                      |
| ----------------------- | ------- | -------------------------------------------------------------------------------- |
| model                   | string  | Model ID used for this request                                                   |
| created                 | integer | Unix timestamp (seconds) of request creation time                                |
| data                    | array   | Array of generated image information                                             |
| data\[].url             | string  | Image URL (returned when response\_format is "url"). Valid for 24 hours          |
| data\[].b64\_json       | string  | Image base64 data (returned when response\_format is "b64\_json")                |
| data\[].size            | string  | Image size in "width x height" format. Only for doubao-seedream-5-0-260128/4-5-251128/4-0-250828 |
| data\[].error           | object  | Error information if image generation failed                                     |
| usage                   | object  | Usage information for this request                                               |
| usage.generated\_images | integer | Number of successfully generated images                                          |
| usage.output\_tokens    | integer | Number of tokens spent on generating images                                      |
| usage.total\_tokens     | integer | Total tokens consumed for this request                                           |
| error                   | object  | Error information if request failed                                              |
| error.code              | string  | Error code                                                                       |
| error.message           | string  | Error message                                                                    |

- request example:

```shell
curl -X POST "https://ark.cn-beijing.volces.com/api/v3/images/generations" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "doubao-seedream-5-0-260128",
    "prompt": "A beautiful sunset over mountains, golden light filtering through clouds",
    "size": "2048x2048",
    "response_format": "url",
    "watermark": false
  }'
```

- response example:

```json
{
  "model": "doubao-seedream-5-0-260128",
  "created": 1712505600,
  "data": [
    {
      "url": "https://example.com/generated_image.png",
      "size": "2048x2048"
    }
  ],
  "usage": {
    "generated_images": 1,
    "output_tokens": 16384,
    "total_tokens": 16384
  }
}
```

### Video Generation

#### Create Video Generation Task

支持模型列表: Seedance 2.0、Seedance 2.0 fast、Seedance 1.5 pro、Seedance 1.0 pro、Seedance 1.0 pro fast、Seedance 1.0 lite

1.Create Video Generation Task(api\_id: create\_video\_generation\_task)

- url: <https://ark.cn-beijing.volces.com/api/v3/contents/generations/tasks>
- type: POST
- request parameters:

| Name                      | Type    | Required | Description                                                            | Default Value    | Constraints                                                      |
| ------------------------- | ------- | -------- | ---------------------------------------------------------------------- | ---------------- | ---------------------------------------------------------------- |
| model                     | string  | Yes      | Model ID or Endpoint ID for this request                               | -                | -                                                                |
| content                   | array   | Yes      | Input content for video generation, supports text, image, audio, video | -                | See content types below                                          |
| callback\_url             | string  | No       | Callback URL for task status notifications                             | -                | -                                                                |
| return\_last\_frame       | boolean | No       | Whether to return the last frame of the generated video                | false            | -                                                                |
| service\_tier             | string  | No       | Service tier type                                                      | default          | Options: "default", "flex"                                       |
| execution\_expires\_after | integer | No       | Task timeout threshold in seconds                                      | 172800           | Range: \[3600, 259200]                                           |
| generate\_audio           | boolean | No       | Whether to generate synchronized audio                                 | true             | Only for Seedance 2.0 & 2.0 fast, Seedance 1.5 pro               |
| draft                     | boolean | No       | Whether to enable draft mode                                           | false            | Only for Seedance 1.5 pro                                        |
| tools                     | array   | No       | Tools configuration for the model                                      | -                | Only for Seedance 2.0 & 2.0 fast                                 |
| safety\_identifier        | string  | No       | Unique identifier for end user                                         | -                | Max 64 characters                                                |
| resolution                | string  | No       | Video resolution                                                       | 720p or 1080p    | Options: "480p", "720p", "1080p"                                 |
| ratio                     | string  | No       | Aspect ratio of the generated video                                    | 16:9 or adaptive | Options: "16:9", "4:3", "1:1", "3:4", "9:16", "21:9", "adaptive" |
| duration                  | integer | No       | Video duration in seconds                                              | 5                | Range varies by model                                            |
| frames                    | integer | No       | Number of frames in the video                                          | -                | Range: \[29, 289], format: 25+4n                                 |
| seed                      | integer | No       | Random seed for controlling generation                                 | -1               | Range: \[-1, 2^32-1]                                             |
| camera\_fixed             | boolean | No       | Whether to fix the camera                                              | false            | Not supported for reference image scenarios                      |
| watermark                 | boolean | No       | Whether to add watermark to the video                                  | false            | -                                                                |

- Content Types:

**Text Content:**

| Name | Type   | Required | Description                              |
| ---- | ------ | -------- | ---------------------------------------- |
| type | string | Yes      | Must be "text"                           |
| text | string | Yes      | Text prompt describing the desired video |

**Image Content:**

| Name           | Type   | Required    | Description                                                   |
| -------------- | ------ | ----------- | ------------------------------------------------------------- |
| type           | string | Yes         | Must be "image\_url"                                          |
| image\_url.url | string | Yes         | Image URL, Base64 encoding, or asset ID                       |
| role           | string | Conditional | Image role: "first\_frame", "last\_frame", "reference\_image" |

**Video Content:**

| Name           | Type   | Required    | Description                    |
| -------------- | ------ | ----------- | ------------------------------ |
| type           | string | Yes         | Must be "video\_url"           |
| video\_url.url | string | Yes         | Video URL or asset ID          |
| role           | string | Conditional | Video role: "reference\_video" |

**Audio Content:**

| Name           | Type   | Required    | Description                             |
| -------------- | ------ | ----------- | --------------------------------------- |
| type           | string | Yes         | Must be "audio\_url"                    |
| audio\_url.url | string | Yes         | Audio URL, Base64 encoding, or asset ID |
| role           | string | Conditional | Audio role: "reference\_audio"          |

- response parameters:

| Name | Type   | Description                                |
| ---- | ------ | ------------------------------------------ |
| id   | string | Video generation task ID. Valid for 7 days |

- request example:

```shell
curl -X POST "https://ark.cn-beijing.volces.com/api/v3/contents/generations/tasks" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "doubao-seedance-2-0-260128",
    "content": [
      {
        "type": "text",
        "text": "A cat yawning at the camera"
      }
    ],
    "resolution": "720p",
    "ratio": "16:9",
    "duration": 5
  }'
```

- response example:

```json
{
  "id": "cgt-20260408123456-abc123"
}
```

#### Query Video Generation Task

支持模型列表: Seedance 2.0、Seedance 2.0 fast、Seedance 1.5 pro、Seedance 1.0 pro、Seedance 1.0 pro fast、Seedance 1.0 lite

1.Query Video Generation Task(api\_id: query\_video\_generation\_task)

- url: <https://ark.cn-beijing.volces.com/api/v3/contents/generations/tasks/{id}>
- type: GET
- request parameters:

| Name | Type   | Required | Description              | Default Value | Constraints            |
| ---- | ------ | -------- | ------------------------ | ------------- | ---------------------- |
| id   | string | Yes      | Video generation task ID | -             | Query parameter in URL |

- response parameters:

| Name                          | Type    | Description                                                                     |
| ----------------------------- | ------- | ------------------------------------------------------------------------------- |
| id                            | string  | Video generation task ID                                                        |
| model                         | string  | Model name and version used                                                     |
| status                        | string  | Task status: "queued", "running", "cancelled", "succeeded", "failed", "expired" |
| error                         | object  | Error information (null if successful)                                          |
| error.code                    | string  | Error code                                                                      |
| error.message                 | string  | Error message                                                                   |
| created\_at                   | integer | Task creation Unix timestamp (seconds)                                          |
| updated\_at                   | integer | Task status update Unix timestamp (seconds)                                     |
| content                       | object  | Video generation output                                                         |
| content.video\_url            | string  | Generated video URL (mp4 format). Valid for 24 hours                            |
| content.last\_frame\_url      | string  | Last frame image URL. Valid for 24 hours                                        |
| seed                          | integer | Seed value used for this request                                                |
| resolution                    | string  | Generated video resolution                                                      |
| ratio                         | string  | Generated video aspect ratio                                                    |
| duration                      | integer | Generated video duration in seconds                                             |
| frames                        | integer | Generated video frame count                                                     |
| framespersecond               | integer | Generated video frame rate                                                      |
| generate\_audio               | boolean | Whether the video contains synchronized audio                                   |
| tools                         | array   | Tools actually used by the model                                                |
| safety\_identifier            | string  | End user unique identifier                                                      |
| draft                         | boolean | Whether the generated video is a draft                                          |
| draft\_task\_id               | string  | Draft video task ID                                                             |
| service\_tier                 | string  | Service tier used for processing                                                |
| execution\_expires\_after     | integer | Task timeout threshold in seconds                                               |
| usage                         | object  | Token usage information                                                         |
| usage.completion\_tokens      | integer | Number of tokens spent on video generation                                      |
| usage.total\_tokens           | integer | Total tokens consumed                                                           |
| usage.tool\_usage             | object  | Tool usage information                                                          |
| usage.tool\_usage.web\_search | integer | Number of web search calls                                                      |

- request example:

```shell
curl -X GET "https://ark.cn-beijing.volces.com/api/v3/contents/generations/tasks/cgt-20260408123456-abc123" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

- response example:

```json
{
  "id": "cgt-20260408123456-abc123",
  "model": "doubao-seedance-2-0-260128",
  "status": "succeeded",
  "created_at": 1712505600,
  "updated_at": 1712505900,
  "content": {
    "video_url": "https://example.com/generated_video.mp4"
  },
  "seed": 12345,
  "resolution": "720p",
  "ratio": "16:9",
  "duration": 5,
  "framespersecond": 24,
  "usage": {
    "completion_tokens": 5000,
    "total_tokens": 5000
  }
}
```

#### Query Video Generation Task List

支持模型列表: Seedance 2.0、Seedance 2.0 fast、Seedance 1.5 pro、Seedance 1.0 pro、Seedance 1.0 pro fast、Seedance 1.0 lite

1.Query Video Generation Task List(api\_id: query\_video\_generation\_task\_list)

- url: <https://ark.cn-beijing.volces.com/api/v3/contents/generations/tasks>
- type: GET
- request parameters:

| Name                 | Type    | Required | Description                 | Default Value | Constraints                                                      |
| -------------------- | ------- | -------- | --------------------------- | ------------- | ---------------------------------------------------------------- |
| page\_num            | integer | No       | Page number for results     | -             | Range: \[1, 500]                                                 |
| page\_size           | integer | No       | Number of results per page  | -             | Range: \[1, 500]                                                 |
| filter.status        | string  | No       | Filter by task status       | -             | Options: "queued", "running", "cancelled", "succeeded", "failed" |
| filter.task\_ids     | string  | No       | Filter by task IDs          | -             | Multiple IDs separated by &                                      |
| filter.model         | string  | No       | Filter by model Endpoint ID | -             | -                                                                |
| filter.service\_tier | string  | No       | Filter by service tier      | default       | Options: "default", "flex"                                       |

- response parameters:

| Name                               | Type    | Description                            |
| ---------------------------------- | ------- | -------------------------------------- |
| items                              | array   | List of video generation tasks         |
| items\[].id                        | string  | Video generation task ID               |
| items\[].model                     | string  | Model name and version used            |
| items\[].status                    | string  | Task status                            |
| items\[].error                     | object  | Error information (null if successful) |
| items\[].created\_at               | integer | Task creation Unix timestamp           |
| items\[].updated\_at               | integer | Task status update Unix timestamp      |
| items\[].content                   | object  | Video generation output                |
| items\[].content.video\_url        | string  | Generated video URL                    |
| items\[].content.last\_frame\_url  | string  | Last frame image URL                   |
| items\[].seed                      | integer | Seed value used                        |
| items\[].resolution                | string  | Generated video resolution             |
| items\[].ratio                     | string  | Generated video aspect ratio           |
| items\[].duration                  | integer | Generated video duration               |
| items\[].frames                    | integer | Generated video frame count            |
| items\[].framespersecond           | integer | Generated video frame rate             |
| items\[].generate\_audio           | boolean | Whether video contains audio           |
| items\[].tools                     | array   | Tools used                             |
| items\[].safety\_identifier        | string  | End user identifier                    |
| items\[].draft                     | boolean | Whether video is a draft               |
| items\[].draft\_task\_id           | string  | Draft video task ID                    |
| items\[].service\_tier             | string  | Service tier used                      |
| items\[].execution\_expires\_after | integer | Task timeout threshold                 |
| items\[].usage                     | object  | Token usage information                |
| total                              | integer | Total number of tasks matching filters |

- request example:

```shell
curl -X GET "https://ark.cn-beijing.volces.com/api/v3/contents/generations/tasks?page_num=1&page_size=10&filter.status=succeeded" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

- response example:

```json
{
  "items": [
    {
      "id": "cgt-20260408123456-abc123",
      "model": "doubao-seedance-2-0-260128",
      "status": "succeeded",
      "created_at": 1712505600,
      "updated_at": 1712505900,
      "content": {
        "video_url": "https://example.com/generated_video.mp4"
      },
      "resolution": "720p",
      "ratio": "16:9",
      "duration": 5,
      "usage": {
        "completion_tokens": 5000,
        "total_tokens": 5000
      }
    }
  ],
  "total": 1
}
```

#### Cancel or Delete Video Generation Task

支持模型列表: Seedance 2.0、Seedance 2.0 fast、Seedance 1.5 pro、Seedance 1.0 pro、Seedance 1.0 pro fast、Seedance 1.0 lite

1.Cancel or Delete Video Generation Task(api\_id: cancel\_delete\_video\_generation\_task)

- url: <https://ark.cn-beijing.volces.com/api/v3/contents/generations/tasks/{id}>
- type: DELETE
- request parameters:

| Name | Type   | Required | Description                                  | Default Value | Constraints            |
| ---- | ------ | -------- | -------------------------------------------- | ------------- | ---------------------- |
| id   | string | Yes      | Video generation task ID to cancel or delete | -             | Query parameter in URL |

- Task Status Operations:

| Current Status | Supports DELETE | Operation          | Status After DELETE |
| -------------- | --------------- | ------------------ | ------------------- |
| queued         | Yes             | Cancel task        | cancelled           |
| running        | No              | -                  | -                   |
| succeeded      | Yes             | Delete task record | -                   |
| failed         | Yes             | Delete task record | -                   |
| cancelled      | No              | -                  | -                   |
| expired        | Yes             | Delete task record | -                   |

- response parameters:

This API has no response parameters.

- request example:

```shell
curl -X DELETE "https://ark.cn-beijing.volces.com/api/v3/contents/generations/tasks/cgt-20260408123456-abc123" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

### 3D Generation

#### Create 3D Generation Task

支持模型列表: doubao-seed3d-1-0-250928

1.Create 3D Generation Task(api\_id: create\_3d\_generation\_task)

- url: <https://ark.cn-beijing.volces.com/api/v3/contents/generations/tasks>
- type: POST
- request parameters:

| Name             | Type   | Required | Description                              | Default Value | Constraints                          |
| ---------------- | ------ | -------- | ---------------------------------------- | ------------- | ------------------------------------ |
| model            | string | Yes      | Model ID or Endpoint ID for this request | -             | Must be "doubao-seed3d-1-0-250928"   |
| content          | array  | Yes      | Input content for 3D generation          | -             | Must include at least 1 image object |
| subdivisionlevel | string | No       | Number of polygon faces in the 3D file   | medium        | Options: "high", "medium", "low"     |
| fileformat       | string | No       | Output 3D file format                    | glb           | Options: "glb", "obj", "usd", "usdz" |

- Content Types:

**Image Content (Required):**

| Name           | Type   | Required | Description                                                                                      |
| -------------- | ------ | -------- | ------------------------------------------------------------------------------------------------ |
| type           | string | Yes      | Must be "image\_url"                                                                             |
| image\_url     | object | Yes      | Image information object                                                                         |
| image\_url.url | string | Yes      | Image URL or Base64 encoding. For Base64, use format: data:image/<format>;base64,\<base64\_data> |

- Image Requirements:
  - Total pixels: < 4096×4096 px
  - Size: ≤ 10MB
  - Supported formats: jpg, jpeg, png, webp, bmp

**Text Content (Optional, for advanced parameters):**

| Name | Type   | Required | Description                                             |
| ---- | ------ | -------- | ------------------------------------------------------- |
| type | string | Yes      | Must be "text"                                          |
| text | string | Yes      | Model text commands to control 3D output specifications |

- Parameter Details:

**subdivisionlevel** (Polygon Face Count):

- `high`: 200,000 faces - Highest detail level
- `medium`: 100,000 faces - Balanced detail (default)
- `low`: 30,000 faces - Lower detail, smaller file size

**fileformat** (Output Format):

- `glb`: GL Transmission Format Binary - Recommended for web and real-time applications
- `obj`: Wavefront OBJ - Widely supported, includes separate material file
- `usd`: Universal Scene Description - Pixar's format for complex scenes
- `usdz`: USD Zip Archive - Optimized for AR applications
- Parameter Handling:

The API accepts `subdivisionlevel` and `fileformat` as separate parameters for convenience.
Internally, these are converted to text commands and added to the content array:

- `--subdivisionlevel <value>` (short form: `--sl <value>`)
- `--fileformat <value>` (short form: `--ff <value>`)

Example conversion:

```json
// Input parameters
{
  "content": [{"type": "image_url", "image_url": {"url": "..."}}],
  "subdivisionlevel": "high",
  "fileformat": "obj"
}

// Converted to API format
{
  "content": [
    {"type": "image_url", "image_url": {"url": "..."}},
    {"type": "text", "text": "--subdivisionlevel high --fileformat obj"}
  ]
}
```

- response parameters:

| Name | Type   | Description                             |
| ---- | ------ | --------------------------------------- |
| id   | string | 3D generation task ID. Valid for 7 days |

- request example:

**Example 1: Basic image-to-3D with default settings**

```shell
curl -X POST "https://ark.cn-beijing.volces.com/api/v3/contents/generations/tasks" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "doubao-seed3d-1-0-250928",
    "content": [
      {
        "type": "image_url",
        "image_url": {
          "url": "https://example.com/object.jpg"
        }
      }
    ]
  }'
```

**Example 2: High-detail OBJ format**

```shell
curl -X POST "https://ark.cn-beijing.volces.com/api/v3/contents/generations/tasks" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "doubao-seed3d-1-0-250928",
    "content": [
      {
        "type": "image_url",
        "image_url": {
          "url": "https://example.com/object.jpg"
        }
      }
    ],
    "subdivisionlevel": "high",
    "fileformat": "obj"
  }'
```

**Example 3: Low-poly GLB for web**

```shell
curl -X POST "https://ark.cn-beijing.volces.com/api/v3/contents/generations/tasks" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "doubao-seed3d-1-0-250928",
    "content": [
      {
        "type": "image_url",
        "image_url": {
          "url": "https://example.com/object.jpg"
        }
      }
    ],
    "subdivisionlevel": "low",
    "fileformat": "glb"
  }'
```

**Example 4: Using Base64 encoded image**

```shell
curl -X POST "https://ark.cn-beijing.volces.com/api/v3/contents/generations/tasks" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "doubao-seed3d-1-0-250928",
    "content": [
      {
        "type": "image_url",
        "image_url": {
          "url": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
        }
      }
    ],
    "subdivisionlevel": "medium",
    "fileformat": "usdz"
  }'
```

- response example:

```json
{
  "id": "cgt-20260408123456-xyz789"
}
```

#### Query 3D Generation Task

支持模型列表: doubao-seed3d-1-0-250928

1.Query 3D Generation Task(api\_id: query\_3d\_generation\_task)

- url: <https://ark.cn-beijing.volces.com/api/v3/contents/generations/tasks/{id}>
- type: GET
- request parameters:

| Name | Type   | Required | Description           | Default Value | Constraints            |
| ---- | ------ | -------- | --------------------- | ------------- | ---------------------- |
| id   | string | Yes      | 3D generation task ID | -             | Query parameter in URL |

- response parameters:

| Name                     | Type    | Description                                                                     |
| ------------------------ | ------- | ------------------------------------------------------------------------------- |
| id                       | string  | 3D generation task ID                                                           |
| model                    | string  | Model name and version used                                                     |
| status                   | string  | Task status: "queued", "running", "cancelled", "succeeded", "failed", "expired" |
| error                    | object  | Error information (null if successful)                                          |
| error.code               | string  | Error code                                                                      |
| error.message            | string  | Error message                                                                   |
| created\_at              | integer | Task creation Unix timestamp (seconds)                                          |
| updated\_at              | integer | Task status update Unix timestamp (seconds)                                     |
| content                  | object  | 3D generation output                                                            |
| content.file\_url        | string  | Generated 3D file URL. Valid for 24 hours                                       |
| usage                    | object  | Token usage information                                                         |
| usage.completion\_tokens | integer | Number of tokens spent on 3D generation                                         |
| usage.total\_tokens      | integer | Total tokens consumed                                                           |

- request example:

```shell
curl -X GET "https://ark.cn-beijing.volces.com/api/v3/contents/generations/tasks/cgt-20260408123456-xyz789" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

- response example:

```json
{
  "id": "cgt-20260408123456-xyz789",
  "model": "doubao-seed3d-1-0-250928",
  "status": "succeeded",
  "created_at": 1712505600,
  "updated_at": 1712505900,
  "content": {
    "file_url": "https://example.com/generated_model.glb"
  },
  "usage": {
    "completion_tokens": 8000,
    "total_tokens": 8000
  }
}
```

#### Query 3D Generation Task List

支持模型列表: doubao-seed3d-1-0-250928

1.Query 3D Generation Task List(api\_id: query\_3d\_generation\_task\_list)

- url: <https://ark.cn-beijing.volces.com/api/v3/contents/generations/tasks>
- type: GET
- request parameters:

| Name             | Type    | Required | Description                 | Default Value | Constraints                                                      |
| ---------------- | ------- | -------- | --------------------------- | ------------- | ---------------------------------------------------------------- |
| page\_num        | integer | No       | Page number for results     | -             | Range: \[1, 500]                                                 |
| page\_size       | integer | No       | Number of results per page  | -             | Range: \[1, 500]                                                 |
| filter.status    | string  | No       | Filter by task status       | -             | Options: "queued", "running", "cancelled", "succeeded", "failed" |
| filter.task\_ids | string  | No       | Filter by task IDs          | -             | Multiple IDs separated by &                                      |
| filter.model     | string  | No       | Filter by model Endpoint ID | -             | -                                                                |

- response parameters:

| Name                       | Type    | Description                            |
| -------------------------- | ------- | -------------------------------------- |
| items                      | array   | List of 3D generation tasks            |
| items\[].id                | string  | 3D generation task ID                  |
| items\[].model             | string  | Model name and version used            |
| items\[].status            | string  | Task status                            |
| items\[].error             | object  | Error information (null if successful) |
| items\[].created\_at       | integer | Task creation Unix timestamp           |
| items\[].updated\_at       | integer | Task status update Unix timestamp      |
| items\[].content           | object  | 3D generation output                   |
| items\[].content.file\_url | string  | Generated 3D file URL                  |
| items\[].usage             | object  | Token usage information                |
| total                      | integer | Total number of tasks matching filters |

- request example:

```shell
curl -X GET "https://ark.cn-beijing.volces.com/api/v3/contents/generations/tasks?page_num=1&page_size=10&filter.status=succeeded" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

- response example:

```json
{
  "items": [
    {
      "id": "cgt-20260408123456-xyz789",
      "model": "doubao-seed3d-1-0-250928",
      "status": "succeeded",
      "created_at": 1712505600,
      "updated_at": 1712505900,
      "content": {
        "file_url": "https://example.com/generated_model.glb"
      },
      "usage": {
        "completion_tokens": 8000,
        "total_tokens": 8000
      }
    }
  ],
  "total": 1
}
```

#### Cancel or Delete 3D Generation Task

支持模型列表: doubao-seed3d-1-0-250928

1.Cancel or Delete 3D Generation Task(api\_id: cancel\_delete\_3d\_generation\_task)

- url: <https://ark.cn-beijing.volces.com/api/v3/contents/generations/tasks/{id}>
- type: DELETE
- request parameters:

| Name | Type   | Required | Description                               | Default Value | Constraints            |
| ---- | ------ | -------- | ----------------------------------------- | ------------- | ---------------------- |
| id   | string | Yes      | 3D generation task ID to cancel or delete | -             | Query parameter in URL |

- Task Status Operations:

| Current Status | Supports DELETE | Operation          | Status After DELETE |
| -------------- | --------------- | ------------------ | ------------------- |
| queued         | Yes             | Cancel task        | cancelled           |
| running        | No              | -                  | -                   |
| succeeded      | Yes             | Delete task record | -                   |
| failed         | Yes             | Delete task record | -                   |
| cancelled      | No              | -                  | -                   |
| expired        | Yes             | Delete task record | -                   |

- response parameters:

This API has no response parameters.

- request example:

```shell
curl -X DELETE "https://ark.cn-beijing.volces.com/api/v3/contents/generations/tasks/cgt-20260408123456-xyz789" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

### Error Code

| Error Code | Message               | Solution                                  |
| ---------- | --------------------- | ----------------------------------------- |
| 400        | Bad request           | Check request parameters                  |
| 401        | Unauthorized          | Check API Key is valid                    |
| 403        | Forbidden             | Check account permissions                 |
| 404        | Not found             | Check resource ID                         |
| 422        | Unprocessable entity  | Check content safety                      |
| 429        | Too many requests     | Reduce request frequency or upgrade quota |
| 500        | Internal server error | Retry later or contact support            |
| 503        | Service unavailable   | Retry later                               |
| 504        | Gateway timeout       | Retry later                               |

### Supported Models

#### Image Generation Models

**doubao-seedream-5-0-260128** (New)

- Sequential image generation (up to 15 images)
- Multi-image fusion (up to 14 reference images)
- Web search integration
- Output format: PNG, JPEG
- Resolution: 2K, 3K

**doubao-seedream-4-5-251128**

- Sequential image generation (up to 15 images)
- Multi-image fusion (up to 14 reference images)
- Resolution: 2K, 4K

**doubao-seedream-4-0-250828**

- Sequential image generation (up to 15 images)
- Multi-image fusion (up to 14 reference images)
- Resolution: 1K, 2K, 4K

**doubao-seedream-3-0-t2i-250415**

- Text-to-image only
- Resolution: 512x512 to 2048x2048

#### Video Generation Models

**Seedance 2.0 & 2.0 fast** (New)

- Multi-modal reference video generation (images, videos, audio)
- First-to-last frame control
- Audio generation
- Duration: 4-15 seconds or auto (-1)
- Resolution: 480p, 720p, 1080p
- Aspect ratios: 16:9, 4:3, 1:1, 3:4, 9:16, 21:9, adaptive

**Seedance 1.5 pro**

- First-to-last frame control
- Audio generation
- Draft mode
- Duration: 4-12 seconds or auto (-1)
- Resolution: 480p, 720p, 1080p

**Seedance 1.0 pro**

- First-to-last frame control
- Duration: 2-12 seconds
- Resolution: 480p, 720p, 1080p

**Seedance 1.0 pro fast**

- Fast generation
- Duration: 2-12 seconds
- Resolution: 480p, 720p, 1080p

**Seedance 1.0 lite**

- Text-to-video (t2v variant)
- Image-to-video (i2v variant)
- Reference image fusion (up to 4 images)
- Duration: 2-12 seconds
- Resolution: 480p, 720p

#### 3D Generation Models

**doubao-seed3d-1-0-250928** (New)

- Image-to-3D generation
- Generates 3D files with textures and PBR materials
- Output formats: GLB, OBJ, USD, USDZ
- Polygon face options: 30,000 (low), 100,000 (medium), 200,000 (high)
- Input: Single image (jpg, jpeg, png, webp, bmp)
- Max image size: 10MB
- Max image resolution: 4096×4096 px

#### Video Resolution and Aspect Ratios

| Resolution | Aspect Ratio | Pixel Size (Seedance 1.x) | Pixel Size (Seedance 2.0) |
| ---------- | ------------ | ------------------------- | ------------------------- |
| 480p       | 16:9         | 864×480                   | 864×496                   |
| 480p       | 4:3          | 736×544                   | 752×560                   |
| 480p       | 1:1          | 640×640                   | 640×640                   |
| 480p       | 9:16         | 480×864                   | 496×864                   |
| 720p       | 16:9         | 1248×704                  | 1280×720                  |
| 720p       | 4:3          | 1120×832                  | 1112×834                  |
| 720p       | 1:1          | 960×960                   | 960×960                   |
| 720p       | 9:16         | 704×1248                  | 720×1280                  |
| 1080p      | 16:9         | 1920×1088                 | 1920×1080                 |
| 1080p      | 4:3          | 1664×1248                 | 1664×1248                 |
| 1080p      | 1:1          | 1440×1440                 | 1440×1440                 |
| 1080p      | 9:16         | 1088×1920                 | 1080×1920                 |

