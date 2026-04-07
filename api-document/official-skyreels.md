- 服务商：Skyreels
- 官网：[https://www.skyreels.ai/](https://www.skyreels.ai/)
- 充值：[https://www.skyreels.ai/dev/pricing/](https://www.skyreels.ai/dev/pricing/)
- 修订日期：2026-04-07

### 目录

- [认证说明](#认证说明)
- [速率限制](#速率限制)
- [Video Generate](#video-generate)
  - [Reference to Video](#reference-to-video)
  - [Video Restyling](#video-restyling)
  - [Video Extension](#video-extension)
    - [Single-shot video extension](#single-shot-video-extension)
    - [Shot Switching video extension](#shot-switching-video-extension)
  - [Text-to-Video Generation](#text-to-video-generation)
  - [Image-to-Video Generation](#image-to-video-generation)
  - [Omni reference](#omni-reference)
- [Talking Avatar Video](#talking-avatar-video)
  - [Single-Actor Avatar](#single-actor-avatar)
  - [Multi-Actor Avatar](#multi-actor-avatar)
  - [Segmented Camera Motion](#segmented-camera-motion)
  - [Lip-sync](#lip-sync)
- [Error Code](#error-code)

### Video Generate

#### Reference to Video

支持模型列表: Skyreels V3

1.Task Submission(api_id: reference_to_video_task_submission)

- url: <https://api-gateway.skyreels.ai/api/v1/video/multiobject/submit>
- type: POST
- request parameters:

| Name          | Type          | Required | Description                                          | Default Value | Constraints                                |
| ------------- | ------------- | -------- | ---------------------------------------------------- | ------------- | ------------------------------------------ |
| api_key      | string        | Yes      | API key for account authentication and rate limiting | -             | -                                          |
| prompt        | string        | Yes      | Video description prompt                             | -             | Max length: 512 tokens                     |
| ref_images   | list[string] | Yes      | 1-4 subject reference images                         | -             | Supported formats: jpg/jpeg, png, gif, bmp |
| duration      | int           | No       | Specify video generation duration                    | 5             | Min 1s, max 5s                             |
| aspect_ratio | string        | No       | Specify generated video aspect ratio                 | 16:9          | Includes 16:9, 9:16, 3:4, 4:3, 1:1         |

- response parameters:

| Name      | Type   | Description                                                                  |
| --------- | ------ | ---------------------------------------------------------------------------- |
| task_id  | string | Task ID for subsequent queries                                               |
| msg       | string | Message description                                                          |
| code      | int    | Status code (200 for success, 429 for service busy, 422 for parameter error) |
| status    | string | Status identifier ("ok" for success)                                         |
| data      | object | Return data, null on success                                                 |
| trace_id | string | Request tracking ID                                                          |

- request example:

```shell
curl -X POST "https://api-gateway.skyreels.ai/api/v1/video/multiobject/submit" \
  -H "Content-Type: application/json" \
  -d '{
    "api_key": "****",
    "prompt": "two girls talking in a club",
    "ref_images": ["https://skyreels-api.oss-accelerate.aliyuncs.com/examples/subject_reference/0_0.png", "https://skyreels-api.oss-accelerate.aliyuncs.com/examples/subject_reference/0_1.png" , "https://skyreels-api.oss-accelerate.aliyuncs.com/examples/subject_reference/0_2.png"],
    "duration": 5,
    "aspect_ratio": "16:9"
  }'
```

- response example:

```json
{
  "task_id": "abc123def456",
  "msg": "Task submitted successfully",
  "code": 200,
  "status": "ok",
  "data": null,
  "trace_id": "trace_123456"
}
```

2.Task Query(api_id: reference_to_video_task_query)

- url: <https://api-gateway.skyreels.ai/api/v1/video/multiobject/task/{task_id}>
- type: GET
- response parameters:

| Name      | Type   | Description                                                         |
| --------- | ------ | ------------------------------------------------------------------- |
| task_id  | string | Task ID                                                             |
| msg       | string | Status message (contains error information on failure)              |
| code      | int    | Status code (200 for success)                                       |
| status    | string | Task status: "submitted", "pending", "running", "failed", "unknown" |
| data      | object | Contains video data on success, null for other statuses             |
| trace_id | string | Request tracking ID                                                 |

- data fields:

| Name          | Type   | Description                                                                                                               |
| ------------- | ------ | ------------------------------------------------------------------------------------------------------------------------- |
| video_url    | string | URL of the generated video                                                                                                |
| duration      | int    | Video duration in seconds                                                                                                 |
| resolution    | string | Video resolution                                                                                                          |
| cost_credits | float  | The number of credits consumed by the task. For specific deduction rules, refer to <https://platform.skyreels.ai/pricing> |

- request example:

```shell
curl -X GET "https://api-gateway.skyreels.ai/api/v1/video/multiobject/task/{task_id}"
```

- response example:

```json
{
  "task_id": "abc123def456",
  "msg": "Task completed successfully",
  "code": 200,
  "status": "running",
  "data": {
    "video_url": "https://skyreels-api.oss-accelerate.aliyuncs.com/output/video_123.mp4",
    "duration": 5,
    "resolution": "1080p",
    "cost_credits": 10.5
  },
  "trace_id": "trace_123456"
}
```

#### Video Restyling

支持模型列表: Skyreels V3

1.Task Submission(api_id: video_restyling_task_submission)

- url: <https://api-gateway.skyreels.ai/api/v1/video/styletransfer/submit>
- type: POST
- request parameters:

| Name        | Type   | Required | Description                                          | Default Value | Constraints                                   |
| ----------- | ------ | -------- | ---------------------------------------------------- | ------------- | --------------------------------------------- |
| api_key    | string | Yes      | API key for account authentication and rate limiting | -             | -                                             |
| video_url  | string | Yes      | URL of the original video                            | -             | Valid HTTP/HTTPS address, max duration 30s    |
| style_name | string | Yes      | Target video style name                              | -             | Select from supported styles, see table below |

- supported styles:

| Style Name       | Description           |
| ---------------- | --------------------- |
| simpsons         | Simpsons style        |
| lego             | Lego style            |
| paper_cutting   | Paper cutting style   |
| amigurumi        | Amigurumi style       |
| animal_crossing | Animal Crossing style |
| van_gogh        | Van Gogh style        |
| pixel_art       | Pixel art style       |

- response parameters:

| Name      | Type   | Description                                                                  |
| --------- | ------ | ---------------------------------------------------------------------------- |
| task_id  | string | Task ID for subsequent queries                                               |
| msg       | string | Message description                                                          |
| code      | int    | Status code (200 for success, 429 for service busy, 422 for parameter error) |
| status    | string | Status identifier ("ok" for success)                                         |
| data      | object | Return data, null on success                                                 |
| trace_id | string | Request tracking ID                                                          |

- request example:

```shell
curl -X POST "https://api-gateway.skyreels.ai/api/v1/video/styletransfer/submit" \
  -H "Content-Type: application/json" \
  -d '{
    "api_key": "****",
    "video_url": "https://skyreels-api.oss-accelerate.aliyuncs.com/examples/restyling/test.mp4",
    "style_name": "simpsons"
  }'
```

- response example:

```json
{
  "task_id": "xyz789abc123",
  "msg": "Task submitted successfully",
  "code": 200,
  "status": "ok",
  "data": null,
  "trace_id": "trace_789012"
}
```

2.Task Query(api_id: video_restyling_task_query)

- url: <https://api-gateway.skyreels.ai/api/v1/video/styletransfer/task/{task_id}>
- type: GET
- response parameters:

| Name      | Type   | Description                                                         |
| --------- | ------ | ------------------------------------------------------------------- |
| task_id  | string | Task ID                                                             |
| msg       | string | Status message (contains error information on failure)              |
| code      | int    | Status code (200 for success)                                       |
| status    | string | Task status: "submitted", "pending", "running", "failed", "unknown" |
| data      | object | Contains video data on success, null for other statuses             |
| trace_id | string | Request tracking ID                                                 |

- data fields:

| Name          | Type   | Description                                                                                                               |
| ------------- | ------ | ------------------------------------------------------------------------------------------------------------------------- |
| video_url    | string | URL of the generated video                                                                                                |
| duration      | int    | Video duration in seconds (generally equals original video duration)                                                      |
| resolution    | string | Generated video resolution (currently fixed at 720p)                                                                      |
| cost_credits | float  | The number of credits consumed by the task. For specific deduction rules, refer to <https://platform.skyreels.ai/pricing> |

- request example:

```shell
curl -X GET "https://api-gateway.skyreels.ai/api/v1/video/styletransfer/task/{task_id}"
```

- response example:

```json
{
  "task_id": "xyz789abc123",
  "msg": "Task completed successfully",
  "code": 200,
  "status": "running",
  "data": {
    "video_url": "https://skyreels-api.oss-accelerate.aliyuncs.com/output/restyled_video_456.mp4",
    "duration": 10,
    "resolution": "720p",
    "cost_credits": 8.0
  },
  "trace_id": "trace_789012"
}
```

#### Video Extension

##### Single-shot video extension

支持模型列表: Skyreels V3

1.Task Submission(api_id: single_shot_video_extension_task_submission)

- url: <https://api-gateway.skyreels.ai/api/v1/video/extension/submit>
- type: POST
- request parameters:

| Name          | Type   | Required | Description                                          | Default Value | Constraints                            |
| ------------- | ------ | -------- | ---------------------------------------------------- | ------------- | -------------------------------------- |
| api_key      | string | Yes      | API key for account authentication and rate limiting | -             | -                                      |
| prompt        | string | Yes      | Video description prompt                             | -             | Max length: 512 tokens                 |
| prefix_video | string | Yes      | Video to be extended                                 | -             | Must be URL, supports video format mp4 |
| duration      | int    | No       | Specify video generation duration                    | 5             | Min 5s, max 30s                        |

- response parameters:

| Name      | Type   | Description                                                                  |
| --------- | ------ | ---------------------------------------------------------------------------- |
| task_id  | string | Task ID for subsequent queries                                               |
| msg       | string | Message description                                                          |
| code      | int    | Status code (200 for success, 429 for service busy, 422 for parameter error) |
| status    | string | Status identifier ("ok" for success)                                         |
| data      | object | Return data, null on success                                                 |
| trace_id | string | Request tracking ID                                                          |

- request example:

```shell
curl -X POST "https://api-gateway.skyreels.ai/api/v1/video/extension/submit" \
  -H "Content-Type: application/json" \
  -d '{
    "api_key": "****",
    "prompt": "A man is making his way forward slowly, leaning on a white cane to prop himself up.",
    "prefix_video": "https://skyreels-api.oss-accelerate.aliyuncs.com/examples/video_extension/test.mp4",
    "duration": 5
  }'
```

- response example:

```json
{
  "task_id": "ext123def456",
  "msg": "Task submitted successfully",
  "code": 200,
  "status": "ok",
  "data": null,
  "trace_id": "trace_345678"
}
```

2.Task Query(api_id: single_shot_video_extension_task_query)

- url: <https://api-gateway.skyreels.ai/api/v1/video/extension/task/{task_id}>
- type: GET
- response parameters:

| Name      | Type   | Description                                                         |
| --------- | ------ | ------------------------------------------------------------------- |
| task_id  | string | Task ID                                                             |
| msg       | string | Status message (contains error information on failure)              |
| code      | int    | Status code (200 for success)                                       |
| status    | string | Task status: "submitted", "pending", "running", "failed", "unknown" |
| data      | object | Contains video data on success, null for other statuses             |
| trace_id | string | Request tracking ID                                                 |

- data fields:

| Name          | Type   | Description                                                                                                               |
| ------------- | ------ | ------------------------------------------------------------------------------------------------------------------------- |
| video_url    | string | URL of the generated video                                                                                                |
| duration      | int    | Video duration in seconds                                                                                                 |
| resolution    | string | Video resolution                                                                                                          |
| cost_credits | float  | The number of credits consumed by the task. For specific deduction rules, refer to <https://platform.skyreels.ai/pricing> |

- request example:

```shell
curl -X GET "https://api-gateway.skyreels.ai/api/v1/video/extension/task/{task_id}"
```

- response example:

```json
{
  "task_id": "ext123def456",
  "msg": "Task completed successfully",
  "code": 200,
  "status": "running",
  "data": {
    "video_url": "https://skyreels-api.oss-accelerate.aliyuncs.com/output/extended_video_789.mp4",
    "duration": 10,
    "resolution": "1080p",
    "cost_credits": 12.0
  },
  "trace_id": "trace_345678"
}
```

##### Shot Switching video extension

支持模型列表: Skyreels V3

1.Task Submission(api_id: shot_switching_video_extension_task_submission)

- url: <https://api-gateway.skyreels.ai/api/v1/video/extension/cutshot/submit>
- type: POST
- request parameters:

| Name          | Type   | Required | Description                                          | Default Value | Constraints                                                                          |
| ------------- | ------ | -------- | ---------------------------------------------------- | ------------- | ------------------------------------------------------------------------------------ |
| api_key      | string | Yes      | API key for account authentication and rate limiting | -             | -                                                                                    |
| prompt        | string | Yes      | Video description prompt                             | -             | Max length: 512 tokens                                                               |
| prefix_video | string | Yes      | Video to be extended                                 | -             | Must be URL, supports video format mp4                                               |
| duration      | int    | No       | Specify video generation duration                    | 5             | Min 2s, max 5s                                                                       |
| cut_type     | string | No       | Shot cut type                                        | "Auto"        | Supports "Auto", "Cut-In", "Cut-Out", "Shot/Reverse Shot", "Multi-Angle", "Cut Away" |

- cut type details:

| Cut Type          | Description                                                                                      |
| ----------------- | ------------------------------------------------------------------------------------------------ |
| Auto              | The model automatically determines the appropriate cut type based on the scene context (default) |
| Cut-In            | Transitions from a wide shot to a close-up within the current scene                              |
| Cut-Out           | Transitions from a close-up to a wide shot within the current scene                              |
| Shot/Reverse Shot | In dialogue scenes, transitions from a shot facing one person to a shot facing the other person  |
| Multi-Angle       | Switches to a different angle to show the current scene                                          |
| Cut Away          | Transitions to a new area within the current scene                                               |

- response parameters:

| Name      | Type   | Description                                                                  |
| --------- | ------ | ---------------------------------------------------------------------------- |
| task_id  | string | Task ID for subsequent queries                                               |
| msg       | string | Message description                                                          |
| code      | int    | Status code (200 for success, 429 for service busy, 422 for parameter error) |
| status    | string | Status identifier ("ok" for success)                                         |
| data      | object | Return data, null on success                                                 |
| trace_id | string | Request tracking ID                                                          |

- request example:

```shell
curl -X POST "https://api-gateway.skyreels.ai/api/v1/video/extension/cutshot/submit" \
  -H "Content-Type: application/json" \
  -d '{
    "api_key": "****",
    "prompt": "A man is making his way forward slowly, leaning on a white cane to prop himself up.",
    "prefix_video": "https://skyreels-api.oss-accelerate.aliyuncs.com/examples/video_extension/test.mp4",
    "duration": 5,
    "cut_type": "Auto"
  }'
```

- response example:

```json
{
  "task_id": "cut123ext456",
  "msg": "Task submitted successfully",
  "code": 200,
  "status": "ok",
  "data": null,
  "trace_id": "trace_567890"
}
```

2.Task Query(api_id: shot_switching_video_extension_task_query)

- url: <https://api-gateway.skyreels.ai/api/v1/video/extension/cutshot/task/{task_id}>
- type: GET
- response parameters:

| Name      | Type   | Description                                                         |
| --------- | ------ | ------------------------------------------------------------------- |
| task_id  | string | Task ID                                                             |
| msg       | string | Status message (contains error information on failure)              |
| code      | int    | Status code (200 for success)                                       |
| status    | string | Task status: "submitted", "pending", "running", "failed", "unknown" |
| data      | object | Contains video data on success, null for other statuses             |
| trace_id | string | Request tracking ID                                                 |

- data fields:

| Name          | Type   | Description                                                                                                               |
| ------------- | ------ | ------------------------------------------------------------------------------------------------------------------------- |
| video_url    | string | URL of the generated video                                                                                                |
| duration      | int    | Video duration in seconds                                                                                                 |
| resolution    | string | Video resolution                                                                                                          |
| cost_credits | float  | The number of credits consumed by the task. For specific deduction rules, refer to <https://platform.skyreels.ai/pricing> |

- request example:

```shell
curl -X GET "https://api-gateway.skyreels.ai/api/v1/video/extension/cutshot/task/{task_id}"
```

- response example:

```json
{
  "task_id": "cut123ext456",
  "msg": "Task completed successfully",
  "code": 200,
  "status": "running",
  "data": {
    "video_url": "https://skyreels-api.oss-accelerate.aliyuncs.com/output/cutshot_video_321.mp4",
    "duration": 10,
    "resolution": "1080p",
    "cost_credits": 15.0
  },
  "trace_id": "trace_567890"
}
```

#### Text-to-Video Generation

支持模型列表: Skyreels V4

1.Task Submission(api_id: text_to_video_generation_task_submission)

- url: <https://api-gateway.skyreels.ai/api/v1/video/text2video/submit>
- type: POST
- request parameters:

| Name              | Type   | Required | Description                                                                                       | Default Value | Constraints                                                                                                                                                                                                                                                   |
| ----------------- | ------ | -------- | ------------------------------------------------------------------------------------------------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| api_key          | string | Yes      | Used for account authentication and rate limiting                                                 | N/A           | -                                                                                                                                                                                                                                                             |
| prompt            | string | Yes      | The prompt describing the video to generate                                                       | N/A           | Max length: 1280 tokens                                                                                                                                                                                                                                       |
| duration          | int    | No       | Duration of the generated video                                                                   | 5             | Minimum: 3 seconds, Maximum: 15 seconds                                                                                                                                                                                                                       |
| aspect_ratio     | string | No       | Aspect ratio of the generated video                                                               | 16:9          | Supported values: "16:9", "4:3", "1:1", "9:16", "3:4"                                                                                                                                                                                                         |
| sound             | bool   | No       | Whether the generated video includes sound effects                                                | False         | -                                                                                                                                                                                                                                                             |
| prompt_optimizer | bool   | No       | Enables automatic prompt expansion and refinement to achieve higher visual fidelity and alignment | True          | -                                                                                                                                                                                                                                                             |
| mode              | string | No       | The quality/performance mode                                                                      | std           | Supported values: "fast", "std", and "pro". "fast" offers faster generation, "std" balances speed and quality, and "pro" delivers higher quality. All modes output at 1080p. Currently, only "std" is supported; "fast" and "pro" support will be added later |

- response parameters:

| Name      | Type   | Description                                                                  |
| --------- | ------ | ---------------------------------------------------------------------------- |
| task_id  | string | The task ID, used for subsequent queries                                     |
| msg       | string | A message describing the result                                              |
| code      | int    | Status code (200 for success, 422 for parameter error, 500 for server error) |
| status    | string | Status identifier ("ok" indicates success)                                   |
| data      | object | Response data, null on successful submission                                 |
| trace_id | string | Request trace ID                                                             |

- request example:

```shell
curl -X POST "https://api-gateway.skyreels.ai/api/v1/video/text2video/submit" \
  -H "Content-Type: application/json" \
  -d '{
    "api_key": "YOUR_API_KEY",
    "prompt": "A serene forest scene at sunset, with golden light filtering through the trees. Birds are chirping and a gentle breeze rustles the leaves.",
    "aspect_ratio": "16:9",
    "duration": 5,
    "sound": false,
    "mode": "std"
  }'
```

- response example:

```json
{
  "task_id": "t2v123abc456",
  "msg": "Task submitted successfully",
  "code": 200,
  "status": "ok",
  "data": null,
  "trace_id": "trace_678901"
}
```

2.Task Query(api_id: text_to_video_generation_task_query)

- url: <https://api-gateway.skyreels.ai/api/v1/video/text2video/task/{task_id}>
- type: GET
- response parameters:

| Name      | Type   | Description                                                                   |
| --------- | ------ | ----------------------------------------------------------------------------- |
| task_id  | string | The task ID                                                                   |
| msg       | string | Status message (contains error info on failure)                               |
| code      | int    | Status code (200 for success, 422 for parameter error, 500 for server error)  |
| status    | string | Task status, includes: "submitted", "pending", "running", "failed", "unknown" |
| data      | object | Contains video data on success, null for other statuses                       |
| trace_id | string | Request trace ID                                                              |

- data fields:

| Name       | Type   | Description                |
| ---------- | ------ | -------------------------- |
| video_url | string | URL of the generated video |
| duration   | int    | Video duration in seconds  |
| resolution | string | Video resolution           |

- request example:

```shell
curl -X GET "https://api-gateway.skyreels.ai/api/v1/video/text2video/task/{task_id}"
```

- response example:

```json
{
  "task_id": "t2v123abc456",
  "msg": "Task completed successfully",
  "code": 200,
  "status": "running",
  "data": {
    "video_url": "https://skyreels-api.oss-accelerate.aliyuncs.com/output/text2video_789.mp4",
    "duration": 5,
    "resolution": "1080p"
  },
  "trace_id": "trace_678901"
}
```

#### Image-to-Video Generation

支持模型列表: Skyreels V4

1.Task Submission(api_id: image_to_video_generation_task_submission)

- url: <https://api-gateway.skyreels.ai/api/v1/video/image2video/submit>
- type: POST
- request parameters:

| Name                | Type                  | Required | Description                                                                                       | Default Value | Constraints                                                                                                                                                                                                                                                   |
| ------------------- | --------------------- | -------- | ------------------------------------------------------------------------------------------------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| api_key            | string                | Yes      | Used for account authentication and rate limiting                                                 | N/A           | -                                                                                                                                                                                                                                                             |
| prompt              | string                | Yes      | The prompt describing the video to generate                                                       | N/A           | Max length: 1280 tokens                                                                                                                                                                                                                                       |
| first_frame_image | string                | Yes      | The first frame image for the video                                                               | N/A           | Supported formats: jpg/jpeg, png, gif, bmp. Must be a URL                                                                                                                                                                                                     |
| end_frame_image   | string                | No       | The last frame image for the video                                                                | N/A           | Supported formats: jpg/jpeg, png, gif, bmp. Must be a URL. At least one of the first_frame_image, end_frame_image, and mid_frame_image must be non-empty                                                                                                |
| mid_frame_images  | List[MidImageConfig] | No       | List of mid frames of the video                                                                   | -             | Supported formats: jpg/jpeg, png, gif, bmp. Must be a URL. The maximum length of the mid frames array is 6. At least one of the first_frame_image, end_frame_image, and mid_frame_image must be non-empty                                               |
| duration            | int                   | No       | Duration of the generated video                                                                   | 5             | Minimum: 3 seconds, Maximum: 15 seconds                                                                                                                                                                                                                       |
| sound               | bool                  | No       | Whether the generated video includes sound effects                                                | False         | -                                                                                                                                                                                                                                                             |
| prompt_optimizer   | bool                  | No       | Enables automatic prompt expansion and refinement to achieve higher visual fidelity and alignment | True          | -                                                                                                                                                                                                                                                             |
| mode                | string                | No       | The quality/performance mode                                                                      | std           | Supported values: "fast", "std", and "pro". "fast" offers faster generation, "std" balances speed and quality, and "pro" delivers higher quality. All modes output at 1080p. Currently, only "std" is supported; "fast" and "pro" support will be added later |

- Mid Image Definitions:
  - MidImageConfig Type:

| Parameter   | Type   | Required | Description                              | Default Value | Constraints                                                                                                                                                                                       |
| ----------- | ------ | -------- | ---------------------------------------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| tag         | string | Yes      | Identifier for the reference image       | N/A           | Must start with @ and appear in the prompt, such as "@image1", "@image2", etc                                                                                                                     |
| image_url  | string | Yes      | Image URL                                | N/A           | Supports jpg/jpeg, png, gif, bmp                                                                                                                                                                  |
| time_stamp | int    | No       | Target timestamp for the reference image | -1            | The timestamp must be less than the video duration (greater than 0 and less than the video duration). A value of -1 indicates that the appearance time of the intermediate image is not specified |

- response parameters:

| Name      | Type   | Description                                                                  |
| --------- | ------ | ---------------------------------------------------------------------------- |
| task_id  | string | The task ID, used for subsequent queries                                     |
| msg       | string | A message describing the result                                              |
| code      | int    | Status code (200 for success, 422 for parameter error, 500 for server error) |
| status    | string | Status identifier ("ok" indicates success)                                   |
| data      | object | Response data, null on successful submission                                 |
| trace_id | string | Request trace ID                                                             |

- request example:

1. Image to video

```shell
curl -X POST "https://api-gateway.skyreels.ai/api/v1/video/image2video/submit" \
  -H "Content-Type: application/json" \
  -d '{
    "api_key": "YOUR_API_KEY",
    "first_frame_image": "https://skyreels-api.oss-cn-hongkong.aliyuncs.com/examples/image2video/image_03.png",
    "prompt": "Slowly pull the camera back and then cut to a frontal close up shot of the man's face looking thoughtfully at the paper in the typewriter.",
    "duration": 5,
    "sound": false,
    "mode": "std"
  }'
```

2. Keyframe Video Generation

```shell
curl -X POST "https://api-gateway.skyreels.ai/api/v1/video/image2video/submit" \
  -H "Content-Type: application/json" \
  -d '{
    "api_key": "YOUR_API_KEY",
    "prompt": "The King anxiously searched for the destination on the map, suddenly made a surprise discovery, ran out of the door, and summoned a flying dragon. @image1 The dragon lowered its body @image2, the King mounted it, and the dragon took off. The King rode the dragon forward, flying over a village.",
    "duration": 5,
    "first_frame_image": "http://skyreels-api.oss-cn-hongkong.aliyuncs.com/examples/reference2video/assets/2015_k2v_0.png",
    "end_frame_image": "http://skyreels-api.oss-cn-hongkong.aliyuncs.com/examples/reference2video/assets/2015_k2v_2.png",
    "mid_frame_images": [
      {
        "tag": "@image1",
        "image_url": "http://skyreels-api.oss-cn-hongkong.aliyuncs.com/examples/reference2video/assets/2015_k2v_1.png",
        "time_stamp": 2
      }
    ],
    "sound": false,
    "prompt_optimizer": true,
    "mode": "std"
  }'
```

- response example:

```json
{
  "task_id": "i2v123def456",
  "msg": "Task submitted successfully",
  "code": 200,
  "status": "ok",
  "data": null,
  "trace_id": "trace_789012"
}
```

2.Task Query(api_id: image_to_video_generation_task_query)

- url: <https://api-gateway.skyreels.ai/api/v1/video/image2video/task/{task_id}>
- type: GET
- response parameters:

| Name      | Type   | Description                                                                   |
| --------- | ------ | ----------------------------------------------------------------------------- |
| task_id  | string | The task ID                                                                   |
| msg       | string | Status message (contains error info on failure)                               |
| code      | int    | Status code (200 for success, 422 for parameter error, 500 for server error)  |
| status    | string | Task status, includes: "submitted", "pending", "running", "failed", "unknown" |
| data      | object | Contains video data on success, null for other statuses                       |
| trace_id | string | Request trace ID                                                              |

- data fields:

| Name       | Type   | Description                |
| ---------- | ------ | -------------------------- |
| video_url | string | URL of the generated video |
| duration   | int    | Video duration in seconds  |
| resolution | string | Video resolution           |

- request example:

```shell
curl -X GET "https://api-gateway.skyreels.ai/api/v1/video/image2video/task/{task_id}"
```

- response example:

```json
{
  "task_id": "i2v123def456",
  "msg": "Task completed successfully",
  "code": 200,
  "status": "running",
  "data": {
    "video_url": "https://skyreels-api.oss-accelerate.aliyuncs.com/output/image2video_456.mp4",
    "duration": 5,
    "resolution": "1080p"
  },
  "trace_id": "trace_789012"
}
```

#### Omni reference

支持模型列表: Skyreels V4

1.Task Submission(api_id: omni_reference_task_submission)

- url: <https://api-gateway.skyreels.ai/api/v1/video/omni-video/submit>
- type: POST
- request parameters:

| Name              | Type                  | Required | Description                                                                                       | Default Value | Constraints                                                                                                                                                                                                                                                                                                                                                |
| ----------------- | --------------------- | -------- | ------------------------------------------------------------------------------------------------- | ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| api_key          | string                | Yes      | Used for account authentication and rate limiting                                                 | N/A           | -                                                                                                                                                                                                                                                                                                                                                          |
| prompt            | string                | Yes      | The prompt describing the video to generate                                                       | N/A           | Max length: 1280 tokens                                                                                                                                                                                                                                                                                                                                    |
| aspect_ratio     | string                | No       | Aspect ratio of the generated video                                                               | 16:9          | Supported values: '16:9', '4:3', '1:1', '9:16', '3:4'. Note: This parameter is ignored if ref_videos is provided, as the output dimensions will automatically align with the reference video                                                                                                                                                              |
| duration          | int                   | No       | Duration of the generated video                                                                   | 5             | Duration range: 3–15 seconds. Note: If ref_videos is provided and the type is "reference", this parameter will be overridden; in that case, the output duration will match the reference video (up to a maximum of 10 seconds)                                                                                                                            |
| ref_images       | List[ReferenceImage] | No       | List of reference images (Subject, Scene, Style, Keyframes, etc.)                                 | N/A           | All items in the list must be of the same type. When the type is "grid", the list length must be 1; when the type is "image", the maximum list length is 3. Video extension tasks cannot be combined with ref_images                                                                                                                                      |
| ref_videos       | List[ReferenceVideo] | No       | List of reference video configurations                                                            | N/A           | ref_videos supports only a single video reference (max 10s). For ref_videos with type "reference": can only be combined with image references of type "image" in ref_images; the output video will by default include the audio from the input video. For ref_videos with type "extend": cannot be combined with ref_images, but audio can be enabled |
| sound             | bool                  | No       | Whether the generated video includes sound effects                                                | False         | When using video reference, the sound is not effective; no audio by default                                                                                                                                                                                                                                                                                |
| prompt_optimizer | bool                  | No       | Enables automatic prompt expansion and refinement to achieve higher visual fidelity and alignment | True          | -                                                                                                                                                                                                                                                                                                                                                          |
| mode              | string                | No       | The quality/performance mode                                                                      | std           | Supported values: "fast", "std", and "pro". "fast" offers faster generation, "std" balances speed and quality, and "pro" delivers higher quality. All modes output at 1080p. Currently, only "std" is supported; "fast" and "pro" support will be added later                                                                                              |

- Reference Object Definitions:
  - ReferenceImage Type

| Parameter   | Type       | Required | Description                           | Default Value | Constraints                                                                                                                                                             |
| ----------- | ---------- | -------- | ------------------------------------- | ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| tag         | string     | Yes      | Identifier for the reference group    | N/A           | Must start with @ and appear in the prompt, such as "@grid_image1", "@image1", etc                                                                                     |
| type        | string     | Yes      | Type of image reference               | N/A           | Options: grid, image. grid: Grid image (a collage of multiple images arranged in a grid). image: Reference image, including reference images of the subject, scene, etc |
| image_urls | List[str] | Yes      | List of image URLs                    | N/A           | Supports jpg/jpeg, png, gif, bmp; image count limits are as follows: grid: 1 image; image: 1 to 5 images                                                                |
| audio_url  | string     | No       | URL of the corresponding voice timbre | ""            | Only reference images of type "image" support the `audio_url` configuration, with a maximum audio length of 15 seconds                                                  |

  - ReferenceVideo Type

| tag        | string | Yes      | Identifier for the video reference | N/A           | Must start with @ and appear in the prompt, such as @video1, etc                                                                                                                                                                                                                                            |
| type       | string | Yes      | Type of video reference            | N/A           | Supports two types: "reference" and "extend". reference: Used for video reference tasks, e.g., motion reference. The audio from the input video will be added to the output video by default. extend: Used for video extension-related tasks. Cannot be combined with ref_images, but sound can be enabled |
| video_url | string | Yes      | The video URL                      | N/A           | Supports MP4, MOV. Max 10s                                                                                                                                                                                                                                                                                  |

- response parameters:

| Name      | Type   | Description                                                                  |
| --------- | ------ | ---------------------------------------------------------------------------- |
| task_id  | string | The task ID, used for subsequent queries                                     |
| msg       | string | A message describing the result                                              |
| code      | int    | Status code (200 for success, 422 for parameter error, 500 for server error) |
| status    | string | Status identifier ("ok" indicates success)                                   |
| data      | object | Response data, null on successful submission                                 |
| trace_id | string | Request trace ID                                                             |

- request example:

1. Multi-subject Reference Video Generation
```shell
curl -X POST "https://api-gateway.skyreels.ai/api/v1/video/omni-video/submit" \
  -H "Content-Type: application/json" \
  -d '{
    "api_key": "YOUR_API_KEY",
    "prompt": "Captured in a gritty anime style, this sequence reveals @Actor-1  caught in a moment of intense physical suffering. <bgm>A low, resonant ambient drone plays in the background, creating an atmosphere of deep unease and tension</bgm>. @Actor-1  says with a strained and pained voice, <dialogue>好痛，超痛的</dialogue><voice_ref>行くな！今がその時だろう。我が息子が怪人に连れ去られたんだぞ！あれから24时间が経とうとしているのに、まだ突入せんとは何事だ！ </voice_ref>. As he continues to grimace against a background of purple haze, he adds, <dialogue>全身上下都很痛</dialogue><voice_ref>行くな！今がその时だろう。我が息子が怪人に连れ去られたんだぞ！あれから24时间が経とうとしているのに、まだ突入せんとは何事だ！ </voice_ref>. The frame hard cuts to a shot of @Actor-1\u0027s torso as he pulls a black shirt over his highly defined abdominal muscles, which are wrapped in white bandages. <sfx>The soft, rhythmic rustle of fabric is heard as the garment slides over his skin</sfx>. The camera tilts up to follow the movement until his face is revealed again. @Actor-1  speaks with a raspy, exhausted tone, <dialogue>喉嚨好渴</dialogue><voice_ref>行くな！今がその时だろう。我が息子が怪人に连れ去られたんだぞ！あれから24时间が経とうとしているのに、まだ突入せんとは何事だ！ </voice_ref>, then <dialogue>还有食物</dialogue><voice_ref>行くな！今がその时だろう。我が息子が怪人に连れ去られたんだぞ！あれから24时间が経とうとしているのに、まだ突入せんとは何事だ！ </voice_ref>, and finally <dialogue>我需要能补充血气的东西</dialogue><voice_ref>行くな！今がその时だろう。我が息子が怪人に连れ去られたんだぞ！あれから24时间が経とうとしているのに、まだ突入せんとは何事だ！ </voice_ref>. The background is a dark, cold concrete room, and the low-frequency background music persists throughout the scene",
    "duration": 5,
    "aspect_ratio": "16:9",
    "ref_images": [
      {
        "tag": "@Actor-1",
        "type": "image",
        "image_urls": ["http://skyreels-api.oss-cn-hongkong.aliyuncs.com/examples/reference2video/assets/1004_mo2v_0.jpg"]
      }
    ],
    "sound": false,
    "prompt_optimizer": true,
    "mode": "std"
  }'
```

2. Grid Reference Image to Video
```shell
curl -X POST "https://api-gateway.skyreels.ai/api/v1/video/omni-video/submit" \
  -H "Content-Type: application/json" \
  -d '{
    "api_key": "YOUR_API_KEY",
    "prompt": "Create a video showing how to make tomato and egg noodles based on the grid of pictures in @image1.",
    "duration": 5,
    "aspect_ratio": "16:9",
    "ref_images": [
      {
        "tag": "@image1",
        "type": "grid",
        "image_urls": ["http://skyreels-api.oss-cn-hongkong.aliyuncs.com/examples/reference2video/assets/2017_gi2v_0.png"]
      }
    ],
    "sound": false,
    "prompt_optimizer": true,
    "mode": "std"
  }'
```

3. Video Motion Reference
```shell
curl -X POST "https://api-gateway.skyreels.ai/api/v1/video/omni-video/submit" \
  -H "Content-Type: application/json" \
  -d '{
    "api_key": "YOUR_API_KEY",
    "prompt": "The man from @image_1 imitates the fighting move of the monster on the left in @video_1. The woman from @image_2 imitates the fighting move of the Ultraman on the right in @video_1, while keeping the background of @video_1.",
    "ref_images": [
      {
        "tag": "@image_1",
        "type": "image",
        "image_urls": ["http://skyreels-api.oss-cn-hongkong.aliyuncs.com/examples/reference2video/assets/9032_%E8%BF%90%E5%8A%A8%E5%8F%82%E8%80%83_0.png"]
      },
      {
        "tag": "@image_2",
        "type": "image",
        "image_urls": ["http://skyreels-api.oss-cn-hongkong.aliyuncs.com/examples/reference2video/assets/9032_%E8%BF%90%E5%8A%A8%E5%8F%82%E8%80%83_1.png"]
      }
    ],
    "ref_videos": [
      {
        "tag": "@video_1",
        "type": "reference",
        "video_url": "http://skyreels-api.oss-cn-hongkong.aliyuncs.com/examples/reference2video/assets/9032_%E8%BF%90%E5%8A%A8%E5%8F%82%E8%80%83_2.mp4"
      }
    ],
    "sound": false,
    "prompt_optimizer": true,
    "mode": "std"
  }'
```

4. Video Subject Replacement
```shell
curl -X POST "https://api-gateway.skyreels.ai/api/v1/video/omni-video/submit" \
  -H "Content-Type: application/json" \
  -d '{
    "api_key": "YOUR_API_KEY",
    "prompt": "Replace the rabbit in @video_1 with the velvet rabbit from @image_1.",
    "ref_images": [
      {
        "tag": "@image_1",
        "type": "image",
        "image_urls": ["http://skyreels-api.oss-cn-hongkong.aliyuncs.com/examples/reference2video/assets/9001_%E4%B8%BB%E4%BD%93%E6%9B%BF%E6%8D%A2_0.jpg"]
      }
    ],
    "ref_videos": [
      {
        "tag": "@video_1",
        "type": "reference",
        "video_url": "http://skyreels-api.oss-cn-hongkong.aliyuncs.com/examples/reference2video/assets/9001_%E4%B8%BB%E4%BD%93%E6%9B%BF%E6%8D%A2_1.mp4"
      }
    ],
    "sound": false,
    "prompt_optimizer": true,
    "mode": "std"
  }'
```

5. Video Background Replacement
```shell
curl -X POST "https://api-gateway.skyreels.ai/api/v1/video/omni-video/submit" \
  -H "Content-Type: application/json" \
  -d '{
    "api_key": "YOUR_API_KEY",
    "prompt": "Replace the background in @video_1 with the Pyramids of Giza from @image_1.",
    "ref_images": [
      {
        "tag": "@image_1",
        "type": "image",
        "image_urls": ["http://skyreels-api.oss-cn-hongkong.aliyuncs.com/examples/reference2video/assets/9027_%E8%83%8C%E6%99%AF%E6%9B%BF%E6%8D%A2_0.png"]
      }
    ],
    "ref_videos": [
      {
        "tag": "@video_1",
        "type": "reference",
        "video_url": "http://skyreels-api.oss-cn-hongkong.aliyuncs.com/examples/reference2video/assets/9027_%E8%83%8C%E6%99%AF%E6%9B%BF%E6%8D%A2_1.mp4"
      }
    ],
    "sound": false,
    "prompt_optimizer": true,
    "mode": "std"
  }'
```

6. Video Object Removal
```shell
curl -X POST "https://api-gateway.skyreels.ai/api/v1/video/omni-video/submit" \
  -H "Content-Type: application/json" \
  -d '{
    "api_key": "YOUR_API_KEY",
    "prompt": "Remove the thin-framed gold spectacles from the man\u0027s hands and face in the central foreground of @video_1.",
    "ref_videos": [
      {
        "tag": "@video_1",
        "type": "reference",
        "video_url": "http://skyreels-api.oss-cn-hongkong.aliyuncs.com/examples/reference2video/assets/10009_%E7%89%A9%E4%BD%93%E5%88%A0%E9%99%A4_0.mp4"
      }
    ],
    "sound": false,
    "prompt_optimizer": true,
    "mode": "std"
  }'
```

7. Video Object Insertion
```shell
curl -X POST "https://api-gateway.skyreels.ai/api/v1/video/omni-video/submit" \
  -H "Content-Type: application/json" \
  -d '{
    "api_key": "YOUR_API_KEY",
    "prompt": "Place the amigurumi crochet cactus from @image_1 on the table in the right side of @video_1, next to the coffee cup.",
    "ref_images": [
      {
        "tag": "@image_1",
        "type": "image",
        "image_urls": ["http://skyreels-api.oss-cn-hongkong.aliyuncs.com/examples/reference2video/assets/9015_%E7%89%A9%E4%BD%93%E6%8F%92%E5%85%A5_0.png"]
      }
    ],
    "ref_videos": [
      {
        "tag": "@video_1",
        "type": "reference",
        "video_url": "http://skyreels-api.oss-cn-hongkong.aliyuncs.com/examples/reference2video/assets/9015_%E7%89%A9%E4%BD%93%E6%8F%92%E5%85%A5_1.mp4"
      }
    ],
    "sound": false,
    "prompt_optimizer": true,
    "mode": "std"
  }'
```

8. Local Video Editing
```shell
curl -X POST "https://api-gateway.skyreels.ai/api/v1/video/omni-video/submit" \
  -H "Content-Type: application/json" \
  -d '{
    "api_key": "YOUR_API_KEY",
    "prompt": "Replace the girl\u0027s clothing in @video_1 with the red superhero bodysuit from @image_1.",
    "ref_images": [
      {
        "tag": "@image_1",
        "type": "image",
        "image_urls": ["http://skyreels-api.oss-cn-hongkong.aliyuncs.com/examples/reference2video/assets/9013_%E5%B1%80%E9%83%A8%E4%BF%AE%E6%94%B9_0.png"]
      }
    ],
    "ref_videos": [
      {
        "tag": "@video_1",
        "type": "reference",
        "video_url": "http://skyreels-api.oss-cn-hongkong.aliyuncs.com/examples/reference2video/assets/9013_%E5%B1%80%E9%83%A8%E4%BF%AE%E6%94%B9_1.mp4"
      }
    ],
    "sound": false,
    "prompt_optimizer": true,
    "mode": "std"
  }'
```

9. Video Extension
```shell
curl -X POST "https://api-gateway.skyreels.ai/api/v1/video/omni-video/submit" \
  -H "Content-Type: application/json" \
  -d '{
    "api_key": "YOUR_API_KEY",
    "prompt": "Video extended @video1, someone walks over and sits on the sofa <dialogue>I am here</dialogue>.",
    "duration": 8,
    "ref_videos": [
        {
            "tag": "@video1",
            "type": "extend",
            "video_url": "http://skyreels-api.oss-cn-hongkong.aliyuncs.com/examples/reference2video/assets/extend_0.mp4"
        }
    ],
    "sound": false,
    "prompt_optimizer": true,
    "mode": "std"
  }'
```

- response example:

```json
{
  "task_id": "omni123xyz789",
  "msg": "Task submitted successfully",
  "code": 200,
  "status": "ok",
  "data": null,
  "trace_id": "trace_890123"
}
```

2.Task Query(api_id: omni_reference_task_query)

- url: <https://api-gateway.skyreels.ai/api/v1/video/omni-video/task/{task_id}>
- type: GET
- response parameters:

| Name      | Type   | Description                                                                   |
| --------- | ------ | ----------------------------------------------------------------------------- |
| task_id  | string | The task ID                                                                   |
| msg       | string | Status message (contains error info on failure)                               |
| code      | int    | Status code (200 for success, 422 for parameter error, 500 for server error)  |
| status    | string | Task status, includes: "submitted", "pending", "running", "failed", "unknown" |
| data      | object | Contains video data on success, null for other statuses                       |
| trace_id | string | Request trace ID                                                              |

- data fields:

| Name       | Type   | Description                |
| ---------- | ------ | -------------------------- |
| video_url | string | URL of the generated video |
| duration   | int    | Video duration in seconds  |
| resolution | string | Video resolution           |

- request example:

```shell
curl -X GET "https://api-gateway.skyreels.ai/api/v1/video/omni-video/task/{task_id}"
```

- response example:

```json
{
  "task_id": "omni123xyz789",
  "msg": "Task completed successfully",
  "code": 200,
  "status": "running",
  "data": {
    "video_url": "https://skyreels-api.oss-accelerate.aliyuncs.com/output/omni_video_123.mp4",
    "duration": 8,
    "resolution": "1080p"
  },
  "trace_id": "trace_890123"
}
```

### Talking Avatar Video

#### Single-Actor Avatar

支持模型列表: Skyreels V3

1. Task Submission(api_id: single_actor_avatar_task_submission)

- url: <https://api-gateway.skyreels.ai/api/v1/video/audio2video/single/submit>
- type: POST
- request parameters:

| Name | Type | Required | Description | Default Value | Constraints |
| ---- | ---- | -------- | ----------- | ------------- | ----------- |
| api_key | string | Yes | API key for account authentication and rate limiting | - | - |
| prompt | string | Yes | Video description prompt | - | Max length: 512 tokens |
| first_frame_image | string | Yes | First frame image of the video, only supports URL format | - | Supported formats: jpg/jpeg, png, gif, bmp |
| audios | List[string] | Yes | Audio file URL list, currently supports 1 audio, only supports URL format | - | Supported formats: mp3, wav; each audio duration <= 200 seconds |
| mode | string | No | The control returns results of different resolutions, including two types of values: std and pro; std returns 720p results, and pro returns 1080p results. | "std" | "std" or "pro" |

- response parameters:

| Name | Type | Description |
| ---- | ---- | ----------- |
| task_id | string | Task ID for subsequent queries |
| msg | string | Message description |
| code | int | Status code (200 for success, 429 for service busy) |
| status | string | Status identifier ("ok" for success) |
| data | object | Return data, null on success |
| trace_id | string | Request tracking ID |

- request example:

```shell
curl -X POST "https://api-gateway.skyreels.ai/api/v1/video/audio2video/single/submit" \
  -H "Content-Type: application/json" \
  -d '{
    "api_key": "****",
    "prompt": "A woman is passionately singing into a professional microphone in a recording studio.",
    "first_frame_image": "https://skyreels-api.oss-accelerate.aliyuncs.com/examples/talking_avatar_video/single1.png",
    "audios": ["https://skyreels-api.oss-accelerate.aliyuncs.com/examples/talking_avatar_video/single_actor/huahai_5s.mp3"]
  }'
```

- response example:

```json
{
  "task_id": "avatar123single",
  "msg": "Task submitted successfully",
  "code": 200,
  "status": "ok",
  "data": null,
  "trace_id": "trace_901234"
}
```

2. Task Query(api_id: single_actor_avatar_task_query)

- url: <https://api-gateway.skyreels.ai/api/v1/video/audio2video/single/task/{task_id}>
- type: GET
- response parameters:

| Name | Type | Description |
| ---- | ---- | ----------- |
| task_id | string | Task ID |
| msg | string | Status message (contains error information on failure) |
| code | int | Status code (200 for success) |
| status | string | Task status: "submitted", "pending", "running", "failed", "unknown" |
| data | object | Contains video data on success, null for other statuses |
| trace_id | string | Request tracking ID |

- data fields:

| Name | Type | Description |
| ---- | ---- | ----------- |
| video_url | string | URL of the generated video |
| duration | int | Video duration in seconds |
| resolution | string | Adaptive resolution |
| cost_credits | float | The number of credits consumed by the task. For specific deduction rules, refer to <https://platform.skyreels.ai/pricing> |

- request example:

```shell
curl -X GET "https://api-gateway.skyreels.ai/api/v1/video/audio2video/single/task/{task_id}"
```

- response example:

```json
{
  "task_id": "avatar123single",
  "msg": "Task completed successfully",
  "code": 200,
  "status": "running",
  "data": {
    "video_url": "https://skyreels-api.oss-accelerate.aliyuncs.com/output/avatar_single_456.mp4",
    "duration": 5,
    "resolution": "720p",
    "cost_credits": 6.0
  },
  "trace_id": "trace_901234"
}
```


#### Multi-Actor Avatar

支持模型列表: Skyreels V3

1. Task Submission(api_id: multi_actor_avatar_task_submission)

- url: <https://api-gateway.skyreels.ai/api/v1/video/audio2video/multi/submit>
- type: POST
- request parameters:

| Name | Type | Required | Description | Default Value | Constraints |
| ---- | ---- | -------- | ----------- | ------------- | ----------- |
| api_key | string | Yes | API key for account authentication and rate limiting | - | - |
| prompt | string | Yes | Video description prompt | - | Max length: 512 tokens |
| first_frame_image | string | Yes | First frame image of the video, only supports URL format | - | Supported formats: jpg/jpeg, png, gif, bmp |
| audios | List[string] | Yes | Audio file URL list, only supports URL format | - | Supported formats: mp3, wav; each audio duration <= 200 seconds |
| bboxes | List[List[float]] | Yes | Multi-person audio2video face bbox, number of bboxes must match number of audios | - | - |
| bboxes_type | str | No | Multi-person bbox type is subject detection or face detection, default is face detection | "face" | "face" or "body" |
| mode | string | No | The control returns results of different resolutions, including two types of values: std and pro; std returns 720p results, and pro returns 1080p results. | "std" | "std" or "pro" |

- response parameters:

| Name | Type | Description |
| ---- | ---- | ----------- |
| task_id | string | Task ID for subsequent queries |
| msg | string | Message description |
| code | int | Status code (200 for success, 429 for service busy) |
| status | string | Status identifier ("ok" for success) |
| data | object | Return data, null on success |
| trace_id | string | Request tracking ID |

- request example:

```shell
curl -X POST "https://api-gateway.skyreels.ai/api/v1/video/audio2video/multi/submit" \
  -H "Content-Type: application/json" \
  -d '{
    "api_key": "******",
    "prompt": "person is talking",
    "first_frame_image": "https://skyreels-api.oss-accelerate.aliyuncs.com/examples/talking_avatar_video/multi_actor/3/image.png",
    "audios": [
      "https://skyreels-api.oss-accelerate.aliyuncs.com/examples/talking_avatar_video/multi_actor/3/2-1.mp3",
      "https://skyreels-api.oss-accelerate.aliyuncs.com/examples/talking_avatar_video/multi_actor/3/2-2.mp3"
    ],
    "bboxes": [
      [10, 11, 650, 726],
      [792, 3, 1262, 647]
    ],
    "bboxes_type": "body"
  }'
```

- response example:

```json
{
  "task_id": "avatar456multi",
  "msg": "Task submitted successfully",
  "code": 200,
  "status": "ok",
  "data": null,
  "trace_id": "trace_012345"
}
```

2. Task Query(api_id: multi_actor_avatar_task_query)

- url: <https://api-gateway.skyreels.ai/api/v1/video/audio2video/multi/task/{task_id}>
- type: GET
- response parameters:

| Name | Type | Description |
| ---- | ---- | ----------- |
| task_id | string | Task ID |
| msg | string | Status message (contains error information on failure) |
| code | int | Status code (200 for success) |
| status | string | Task status: "submitted", "pending", "running", "failed", "unknown" |
| data | object | Contains video data on success, null for other statuses |
| trace_id | string | Request tracking ID |

- data fields:

| Name | Type | Description |
| ---- | ---- | ----------- |
| video_url | string | URL of the generated video |
| duration | int | Video duration in seconds |
| resolution | string | Video resolution |
| cost_credits | float | The number of credits consumed by the task. For specific deduction rules, refer to <https://platform.skyreels.ai/pricing> |

- request example:

```shell
curl -X GET "https://api-gateway.skyreels.ai/api/v1/video/audio2video/multi/task/{task_id}"
```

- response example:

```json
{
  "task_id": "avatar456multi",
  "msg": "Task completed successfully",
  "code": 200,
  "status": "running",
  "data": {
    "video_url": "https://skyreels-api.oss-accelerate.aliyuncs.com/output/avatar_multi_789.mp4",
    "duration": 10,
    "resolution": "720p",
    "cost_credits": 12.0
  },
  "trace_id": "trace_012345"
}
```

#### Segmented Camera Motion
1. Task Submission(api_id: segmented_camera_motion_task_submit)

- url: <https://api-gateway.skyreels.ai/api/v1/video/audio2video/camera/submit>
- type: POST
- request parameters:

| Name | Type | Required | Description | Default Value | Constraints |
| ---- | ---- | -------- | ----------- | ------------- | ----------- |
| api_key | string | Yes | API key for account authentication and rate limiting | - | - |
| prompt | string | Yes | Video description prompt | - | Max length: 512 tokens |
| first_frame_image | string | Yes | First frame image of the video, only supports URL format | - | Supported formats: jpg/jpeg, png, gif, bmp |
| audios | List[string] | Yes | Audio file URL list, currently supports 1 audio, only supports URL format | - | Supported formats: mp3, wav; each audio duration <= 200 seconds |
| traj_type | string | No | Camera motion type | "" | See optional values below |
| camera_control_strength | float | No | Camera motion amplitude | 0.8 | Range: (0, 1.0] |
| camera_control_pro | List[CameraControlProParameters] | No | Complex camera motion parameters, supports precise control of multiple time segments | [] | See detailed description below |
| mode | string | No | The control returns results of different resolutions, including two types of values: std and pro; std returns 720p results, and pro returns 1080p results. | "std" | "std" or "pro" |

- response parameters:

| Name | Type | Description |
| ---- | ---- | ----------- |
| task_id | string | Task ID for subsequent queries |
| msg | string | Message description |
| code | int | Status code (200 for success, 429 for service busy) |
| status | string | Status identifier ("ok" for success) |
| data | object | Return data, null on success |
| trace_id | string | Request tracking ID |

- request example:
1.Basic Camera Motion
```shell
curl -X POST "https://api-gateway.skyreels.ai/api/v1/video/audio2video/camera/submit" \
  -H "Content-Type: application/json" \
  -d '{
    "api_key": "****",
    "prompt": "A woman is passionately singing into a professional microphone in a recording studio.",
    "first_frame_image": "https://skyreels-api.oss-accelerate.aliyuncs.com/examples/talking_avatar_video/single1.png",
    "audios": [
        "https://skyreels-api.oss-accelerate.aliyuncs.com/examples/talking_avatar_video/single_actor/huahai_5s.mp3"
    ],
    "traj_type": "crane_up",
    "camera_control_strength": 0.8
  }'
```
2.Complex Camera Motion
```shell
curl -X POST "https://api-gateway.skyreels.ai/api/v1/video/audio2video/camera/submit" \
  -H "Content-Type: application/json" \
  -d '{
        "api_key": "********",
        "prompt": "A woman singing in a recording studio",
        "first_frame_image": "https://skyreels-api.oss-accelerate.aliyuncs.com/examples/talking_avatar_video/img.png",
        "audios": [
            "https://skyreels-api.oss-accelerate.aliyuncs.com/examples/talking_avatar_video/single_actor/1.wav"
        ],
        "camera_control_pro": [
          {
            "start_time": 0.0,
            "end_time": 2.0,
            "traj_type": "push_in",
            "camera_control_strength": 0.7
          },
          {
            "start_time": 2.0,
            "end_time": 4.0,
            "traj_type": "pan_right",
            "camera_control_strength": 0.6,
            "traj_type_2": "crane_up",
            "camera_control_strength_2": 0.4
          },
          {
            "start_time": 4.0,
            "end_time": -1,
            "traj_type": "static",
            "camera_control_strength": 0.5
          }
        ]
    }'
```

- response example:

```json
{
  "task_id": "camera123motion",
  "msg": "Task submitted successfully",
  "code": 200,
  "status": "ok",
  "data": null,
  "trace_id": "trace_123456"
}
```

2-1.Parameter Details:
  - Camera Motion Type (traj_type) Optional Values
    - "static" : Static
    - "push_in" : Push in
    - "push_out" : Pull out
    - "pan_left" : Pan left
    - "pan_right" : Pan right
    - "crane_up" : Crane up
    - "crane_down" : Crane down
    - "swing" : Swing
    - "left_rotation" : Left rotation
    - "right_rotation" : Right rotation
    - Empty string "" or not provided
  - traj_type + camera_control_strength parameters are mutually exclusive. The traj_type parameter effect is equivalent to camera_control_pro with one camera motion type from start to end.

2-2.CameraControlProParameters - Complex Camera Motion Parameters
| Name | Type | Required | Description | Default Value | Constraints |
| ---- | ---- | -------- | ----------- | ------------- | ----------- |
| start_time | float | Yes | Camera motion start time (seconds) | - | Must be less than end_time, time segments cannot overlap |
| end_time | float | Yes | Camera motion end time (seconds) | - | -1 means until video end |
| traj_type | string | Yes | First camera motion type | - | Same as traj_type optional values |
| camera_control_strength | float | No | First camera motion amplitude | 0.8 | Range: (0, 1.0] |
| traj_type_2 | string | No | Second camera motion type (supports dual camera motion combination) | "" | Same as traj_type optional values |
| camera_control_strength_2 | float | No | Second camera motion amplitude | - | - |

2. Task Query(api_id: segmented_camera_motion_task_query)
- url: <https://api-gateway.skyreels.ai/api/v1/video/audio2video/camera/task/{task_id}>
- type: GET
- response parameters:

| Name | Type | Description |
| ---- | ---- | ----------- |
| task_id | string | Task ID |
| msg | string | Status message (contains error information on failure) |
| code | int | Status code (200 for success) |
| status | string | Task status: "submitted", "pending", "running", "failed", "unknown" |
| data | object | Contains video data on success, null for other statuses |
| trace_id | string | Request tracking ID |

- data fields:

| Name | Type | Description |
| ---- | ---- | ----------- |
| video_url | string | URL of the generated video |
| duration | int | Video duration in seconds |
| resolution | string | Video resolution |
| cost_credits | float | The number of credits consumed by the task. For specific deduction rules, refer to https://platform.skyreels.ai/pricing |

- request example:

```shell
curl -X GET "https://api-gateway.skyreels.ai/api/v1/video/audio2video/camera/task/{task_id}"
```

- response example:

```json
{
  "task_id": "camera123motion",
  "msg": "Task completed successfully",
  "code": 200,
  "status": "running",
  "data": {
    "video_url": "https://skyreels-api.oss-accelerate.aliyuncs.com/output/camera_motion_456.mp4",
    "duration": 5,
    "resolution": "720p",
    "cost_credits": 8.0
  },
  "trace_id": "trace_123456"
}
```

#### Lip-sync
1. Task Submission(api_id: lip_sync_task_submit)

- url: <https://api-gateway.skyreels.ai/api/v1/video/retalking/submit>
- type: POST
- request parameters:

| Name | Type | Required | Description | Default Value | Constraints |
| ---- | ---- | -------- | ----------- | ------------- | ----------- |
| api_key | string | Yes | API key for account authentication and rate limiting | - | - |
| video_url | string | Yes | URL of the video file | - | Valid HTTP/HTTPS address |
| audio_url | string | Yes | URL of the audio file | - | - |
| reference_char_url | string | No | URL of the reference character image for face driving | - | - |

- response parameters:

| Name | Type | Description |
| ---- | ---- | ----------- |
| task_id | string | Task ID for subsequent queries |
| msg | string | Message description |
| code | int | Status code (200 for success, 429 for service busy, 422 for parameter error) |
| status | string | Status identifier ("ok" for success) |
| data | object | Return data, null on success |
| trace_id | string | Request tracking ID |

- request example:

```shell
curl -X POST "https://api-gateway.skyreels.ai/api/v1/video/retalking/submit" \
  -H "Content-Type: application/json" \
  -d '{
    "api_key": "****",
    "video_url": "https://skyreels-api.oss-accelerate.aliyuncs.com/examples/lipsync/video.mp4",
    "audio_url": "https://skyreels-api.oss-accelerate.aliyuncs.com/examples/lipsync/audio.wav"
  }'
```

- response example:

```json
{
  "task_id": "lipsync123abc",
  "msg": "Task submitted successfully",
  "code": 200,
  "status": "ok",
  "data": null,
  "trace_id": "trace_234567"
}
```
2. Task Query(api_id: lip_sync_task_query)

- url: <https://api-gateway.skyreels.ai/api/v1/video/retalking/task/{task_id}>
- type: GET
- response parameters:

| Name | Type | Description |
| ---- | ---- | ----------- |
| task_id | string | Task ID |
| msg | string | Status message (contains error information on failure) |
| code | int | Status code (200 for success) |
| status | string | Task status: "submitted", "pending", "running", "failed", "unknown" |
| data | object | Contains video data on success, null for other statuses |
| trace_id | string | Request tracking ID |

- data fields:

| Name | Type | Description |
| ---- | ---- | ----------- |
| video_url | string | URL of the generated video |
| duration | int | Video duration in seconds (generally equals original video duration) |
| resolution | string | Generated video resolution (currently fixed at 720p) |
| cost_credits | float | The number of credits consumed by the task. For specific deduction rules, refer to https://platform.skyreels.ai/pricing. |

- request example:

```shell
curl -X GET "https://api-gateway.skyreels.ai/api/v1/video/retalking/task/{task_id}"
```

- response example:

```json
{
  "task_id": "lipsync123abc",
  "msg": "Task completed successfully",
  "code": 200,
  "status": "running",
  "data": {
    "video_url": "https://skyreels-api.oss-accelerate.aliyuncs.com/output/lipsync_456.mp4",
    "duration": 10,
    "resolution": "720p",
    "cost_credits": 5.0
  },
  "trace_id": "trace_234567"
}
```

### Error Code
This document outlines common SkyReels API error codes and their solutions to help developers resolve problems quickly.

| Error Code | Message | Solution |
| ---------- | ------- | -------- |
| 401 | Invalid API key | Fill in the correct API key |
| 422 | Parameter error | Check the parameters against the API documentation |
| 429 | Service busy | Retry later |
| 480 | Insufficient account credits | Recharge credits |
| 481 | Concurrency or QPS exceeds resource package limit | Reduce request frequency, retry later, or contact support to increase quota |
| 500 | Internal error | Retry later, or contact support |
| 482 | Platform security policy triggered | Check input content, modify and resubmit request |
