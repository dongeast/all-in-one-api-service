- 服务商：Vidu
- 官网：<https://www.vidu.cn/>
- 充值：<https://platform.vidu.cn/>
- 修订日期：2026-04-15
- 备注：所有视频生成接口均为异步调用，需要通过任务ID查询生成结果

### 目录

- [认证说明](#认证说明)
- [图片生成](#图片生成)
  - [参考生图](#参考生图)
- [视频生成](#视频生成)
  - [参考生视频](#参考生视频)
  - [文生视频](#文生视频)
  - [图生视频](#图生视频)
  - [首尾帧](#首尾帧)
  - [智能多帧](#智能多帧)
- [特效模板](#特效模板)
  - [场景特效模板](#场景特效模板)
  - [模板成片](#模板成片)
- [任务管理](#任务管理)
  - [查询任务](#查询任务)
  - [取消任务](#取消任务)
- [Http Status Code](#http-status-code)
- [Supported Models](#supported-models)

### 认证说明

Vidu API 使用 Token 认证方式，所有API请求都需要在请求头中包含有效的API Key。

#### 获取 API Key

1. 访问 [Vidu 平台](https://platform.vidu.cn/)
2. 注册或登录您的账户
3. 在控制台中生成或获取您的API Key

#### 认证方式

在所有API请求的Header中添加Authorization字段：

```
Authorization: Token YOUR_API_KEY
```

#### 请求示例

```bash
curl -X POST "https://api.vidu.cn/ent/v2/text2video" \
  -H "Authorization: Token YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "viduq3-pro",
    "prompt": "A beautiful sunset over mountains",
    "duration": 5,
    "resolution": "720p"
  }'
```

#### 注意事项

- **保密性**: 请妥善保管您的API Key，不要在公开场合泄露
- **权限控制**: API Key 具有账户级别的访问权限，请勿分享给他人
- **额度管理**: API调用会消耗账户积分，请确保账户有足够额度
- **异步处理**: 所有视频生成任务均为异步处理，需要通过任务ID查询结果
- **回调机制**: 支持设置回调URL，任务状态变化时会主动通知

### 图片生成

#### 参考生图

支持模型列表: viduq2、viduq1

1.参考生图(api\_id: reference2image\_task)

- url: <https://api.vidu.cn/ent/v2/reference2image>
- type: POST
- request parameters:

| Name          | Type           | Required | Description                    | Default Value | Constraints                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| ------------- | -------------- | -------- | ------------------------------ | ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Authorization | string         | Yes      | API key authentication (Token) | -             | Header parameter, format: "Token YOUR\_API\_KEY"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| Content-Type  | string         | Yes      | Data exchange format           | -             | Header parameter, value: "application/json"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| model         | String         | Yes      | Model name                     | -             | Options: "viduq2", "viduq1"viduq2: Supports text-to-image, image editing, reference-to-imageviduq1: Supports reference-to-image                                                                                                                                                                                                                                                                                                                                                                                                  |
| images        | Array\[String] | No       | Image references               | -             | viduq2: Supports 0-7 imagesviduq1: Supports 1-7 imagesModel will use the subjects in the images as references to generate images consistent with the subjectsNote 1: Supports Base64 encoding or image URL (ensure accessible)Note 2: Supports png, jpeg, jpg, webp formatsNote 3: Image resolution not less than 128\*128, aspect ratio less than 1:4 or 4:1Note 4: Size not exceeding 50MNote 5: HTTP POST body not exceeding 20MB, must include appropriate content type string, e.g.: data:image/png;base64,{base64\_encode} |
| prompt        | String         | Yes      | Text prompt                    | -             | Text description for image generation, max 2000 charactersNote 1: viduq2 model supports text-to-image, when using viduq2 model without any images, the model will use this text to generate an image                                                                                                                                                                                                                                                                                                                             |
| seed          | Int            | No       | Random seed                    | 0             | When not provided or 0, a random number will be usedManually set to use the specified seed                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| aspect\_ratio | String         | No       | Aspect ratio                   | 16:9          | viduq1: Default 16:9, options: 16:9, 9:16, 1:1, 3:4, 4:3viduq2: Default 16:9, options: 16:9, 9:16, 1:1, 3:4, 4:3, 21:9, 2:3, 3:2auto: Same aspect ratio as the first input image                                                                                                                                                                                                                                                                                                                                                 |
| resolution    | String         | No       | Resolution                     | 1080p         | viduq1: Default 1080p, options: 1080pviduq2: Default 1080p, options: 1080p, 2K, 4K                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| payload       | String         | No       | Pass-through parameter         | -             | No processing, only for data transmissionNote: Max 1048576 characters                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| callback\_url | String         | No       | Callback URL                   | -             | Callback protocolSet callback\_url when creating task, request method is POSTWhen task status changes, Vidu will send a callback request containing the latest statusCallback status includes: processing, success, failedSee: [Callback Signature Algorithm](https://platform.vidu.cn/docs/callback-signature)                                                                                                                                                                                                                  |

- response parameters:

| Name          | Type           | Description                                                              |
| ------------- | -------------- | ------------------------------------------------------------------------ |
| task\_id      | String         | Vidu generated task ID                                                   |
| state         | String         | Processing statusOptions: created, queueing, processing, success, failed |
| model         | String         | Model name used in this call                                             |
| prompt        | String         | Prompt parameter used in this call                                       |
| images        | Array\[String] | Image parameters used in this call                                       |
| seed          | Int            | Random seed parameter used in this call                                  |
| aspect\_ratio | String         | Aspect ratio parameter used in this call                                 |
| resolution    | String         | Resolution parameter used in this call                                   |
| callback\_url | String         | Callback parameter used in this call                                     |
| payload       | String         | Pass-through parameter used in this call                                 |
| credits       | Int            | Credits used in this call                                                |
| created\_at   | String         | Task creation time                                                       |

- request example:

```shell
curl -X POST -H "Authorization: Token {your_api_key}" -H "Content-Type: application/json" -d '
{
    "model": "viduq2",
    "images":["your_image_url1","your_image_url2","your_image_url3"],
    "prompt": "your_prompt",
    "seed": 0,
    "aspect_ratio":"16:9",
    "resolution":"2K",
    "payload":""
}' https://api.vidu.cn/ent/v2/reference2image
```

- response example:

```json
{
  "task_id": "your_task_id_here",
  "state": "created",
  "model": "viduq2",
  "images": ["your_image_url1","your_image_url2","your_image_url3"],
  "prompt": "your_prompt",
  "seed": 0,
  "aspect_ratio":"16:9",
  "resolution":"2K",
  "payload": "",
  "credits": 12,
  "created_at": "2025-08-07T09:53:22.083033428Z"
}
```

### 视频生成

#### 参考生视频

支持模型列表: viduq3-turbo、viduq3、viduq2-pro、viduq2、viduq1、vidu2.0

##### 使用主体调用

1.参考生视频-主体调用(api\_id: reference2video\_subject\_task)

- url: <https://api.vidu.cn/ent/v2/reference2video>
- type: POST
- request parameters:

| Name                | Type           | Required | Description                     | Default Value                      | Constraints                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| ------------------- | -------------- | -------- | ------------------------------- | ---------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Authorization       | string         | Yes      | API key authentication (Token)  | -                                  | Header parameter, format: "Token YOUR\_API\_KEY"                                                                                                                                                                                                                                                                                                                                                                                                    |
| Content-Type        | string         | Yes      | Data exchange format            | -                                  | Header parameter, value: "application/json"                                                                                                                                                                                                                                                                                                                                                                                                         |
| model               | String         | Yes      | Model name                      | -                                  | Options: viduq3-turbo, viduq3, viduq2-pro, viduq2, viduq1, vidu2.0viduq3-turbo: Smart scene cutting, audio-video sync, fastest generation, best cost-performanceviduq3: Smart scene cutting, audio-video sync, better multi-camera consistencyviduq2-pro: Supports reference video, video editing, video replacementviduq2: Good dynamics, rich detailsviduq1: Clear picture, smooth transitions, stable camera movementvidu2.0: Fast generation    |
| auto\_subjects      | Bool           | No       | Use intelligent subject library | false                              | Options: true, falsetrue: Use intelligent subject libraryfalse: Do not use intelligent subject library                                                                                                                                                                                                                                                                                                                                              |
| subjects            | List\[Array]   | Yes      | Subject list                    | -                                  | When using q3, q2, q1, 2.0 models: Only image and text subjects allowed, max 7 subjectsWhen using q2-pro model: Video, text, and image subjects allowed- Image or text subjects: max 4- Video subjects: max 2 (temporary video subjects: max 1)Note: viduq3-mix does not support subjects                                                                                                                                                           |
| subjects.name       | String         | Yes      | Subject ID                      | -                                  | Can be used with @subject\_id in subsequent generation                                                                                                                                                                                                                                                                                                                                                                                              |
| subjects.images     | Array\[String] | No       | Subject images                  | -                                  | Image URLs for this subject, one of images or videos is requiredNote 1: Supports Base64 encoding or image URL (ensure accessible)Note 2: Max 3 images per subjectNote 3: Supports png, jpeg, jpg, webp formatsNote 4: Aspect ratio less than 1:4 or 4:1Note 5: Base64 decoded byte length less than 20M, must include appropriate content type string                                                                                               |
| subjects.videos     | Array\[String] | No       | Subject videos                  | -                                  | Video URLs for this subject, one of images or videos is requiredNote 1: Only viduq2-pro model supports video subjectsNote 2: Images and videos share 3 slots per subjectNote 3: Supports 1 video up to 5 secondsNote 4: Supports Base64 encoding or video URL (ensure accessible)Note 5: Supports mp4, avi, mov formatsNote 6: Resolution not less than 128\*128, aspect ratio less than 1:4 or 4:1Note 7: Base64 decoded byte length less than 20M |
| subjects.voice\_id  | String         | No       | Voice ID                        | -                                  | Determines the voice in the video, auto-recommended if emptySee: [Voice List](https://shengshu.feishu.cn/sheets/EgFvs6DShhiEBStmjzccr5gonOg)Or use [Voice Clone API](https://platform.vidu.cn/docs/voice-clone)                                                                                                                                                                                                                                     |
| prompt              | String         | Yes      | Text prompt                     | -                                  | Text description for video generation, max 5000 charactersNote: When using subjects, reference with @subject\_name, e.g.: "@1 and @2 eating hotpot together"                                                                                                                                                                                                                                                                                        |
| audio               | Bool           | No       | Audio-video sync                | false (viduq3, viduq3-turbo: true) | Options: true, falsetrue: Enable audio-video syncfalse: Silent video                                                                                                                                                                                                                                                                                                                                                                                |
| audio\_type         | String         | No       | Audio type                      | all                                | Required when audio is trueOptions: all (sound effects + voice), speech\_only (voice only), sound\_effect\_only (sound effects only)                                                                                                                                                                                                                                                                                                                |
| duration            | Int            | No       | Video duration                  | 5 (varies by model)                | viduq3-turbo: Default 5s, options: 3-16viduq3: Default 5s, options: 3-16viduq2-pro: Default 5s, options: 0-10 (0 for auto-detect)viduq2: Default 5s, options: 1-10viduq1: Default 5s, options: 5vidu2.0: Default 4s, options: 4                                                                                                                                                                                                                     |
| seed                | Int            | No       | Random seed                     | 0                                  | When not provided or 0, a random number will be used                                                                                                                                                                                                                                                                                                                                                                                                |
| aspect\_ratio       | String         | No       | Aspect ratio                    | 16:9                               | Options: 16:9, 9:16, 1:1Note: q2 model supports any aspect ratio                                                                                                                                                                                                                                                                                                                                                                                    |
| resolution          | String         | No       | Resolution                      | 720p (varies by model)             | viduq3-turbo (3-16s): Default 720p, options: 540p, 720p, 1080pviduq3 (3-16s): Default 720p, options: 540p, 720p, 1080pviduq2, viduq2-pro: Default 720p, options: 540p, 720p, 1080pviduq1: Default 1080p, options: 1080pvidu2.0: Default 360p, options: 360p, 720p                                                                                                                                                                                   |
| movement\_amplitude | String         | No       | Movement amplitude              | auto                               | Options: auto, small, medium, largeNote: Not effective for q2, q3 models                                                                                                                                                                                                                                                                                                                                                                            |
| payload             | String         | No       | Pass-through parameter          | -                                  | Max 1048576 characters                                                                                                                                                                                                                                                                                                                                                                                                                              |
| off\_peak           | Bool           | No       | Off-peak mode                   | false                              | Options: true, falsetrue: Off-peak generation (lower cost, within 48 hours)false: Immediate generationNote: q3 models support off-peak when audio is true; q2, q1, 2.0 support off-peak when audio is false                                                                                                                                                                                                                                         |
| watermark           | Bool           | No       | Add watermark                   | false                              | Options: true, falseNote: Watermark content is fixed, AI-generated by default                                                                                                                                                                                                                                                                                                                                                                       |
| wm\_position        | Int            | No       | Watermark position              | 3                                  | Options: 1 (top-left), 2 (top-right), 3 (bottom-right), 4 (bottom-left)                                                                                                                                                                                                                                                                                                                                                                             |
| wm\_url             | String         | No       | Watermark image URL             | -                                  | If not provided, uses default AI-generated watermark                                                                                                                                                                                                                                                                                                                                                                                                |
| meta\_data          | String         | No       | Metadata identifier             | -                                  | JSON format string, pass-through field                                                                                                                                                                                                                                                                                                                                                                                                              |
| callback\_url       | String         | No       | Callback URL                    | -                                  | See callback protocol documentation                                                                                                                                                                                                                                                                                                                                                                                                                 |

- response parameters:

| Name                | Type           | Description                                                              |
| ------------------- | -------------- | ------------------------------------------------------------------------ |
| task\_id            | String         | Vidu generated task ID                                                   |
| state               | String         | Processing statusOptions: created, queueing, processing, success, failed |
| model               | String         | Model name used in this call                                             |
| prompt              | String         | Prompt parameter used in this call                                       |
| images              | Array\[String] | Image parameters used in this call                                       |
| duration            | Int            | Video duration parameter used in this call                               |
| seed                | Int            | Random seed parameter used in this call                                  |
| aspect\_ratio       | String         | Aspect ratio parameter used in this call                                 |
| resolution          | String         | Resolution parameter used in this call                                   |
| bgm                 | Bool           | Background music parameter used in this call                             |
| audio               | Bool           | Whether audio-video sync was enabled in this call                        |
| audio\_type         | String         | Audio type output in this call                                           |
| movement\_amplitude | String         | Movement amplitude parameter used in this call                           |
| payload             | String         | Pass-through parameter used in this call                                 |
| off\_peak           | Bool           | Whether off-peak mode was used in this call                              |
| credits             | Int            | Credits used in this call                                                |
| watermark           | Bool           | Whether watermark was used in this call                                  |
| created\_at         | String         | Task creation time                                                       |

- request example:

```shell
curl -X POST -H "Authorization: Token {your_api_key}" -H "Content-Type: application/json" -d '
{
    "model": "viduq3",
    "subjects": [
        {
            "name": "your_subject1_name",
            "images": ["your_image_url1","your_image_url2","your_image_url3"],
            "voice_id": ""
        },
        {
            "name": "your_subject2_name",
            "images": ["your_image_url4","your_image_url5","your_image_url6"],
            "voice_id": ""
        }
    ],
    "prompt": "@your_subject1_name 和 @your_subject2_name 在一起吃火锅，并且旁白音说火锅大家都爱吃。",
    "duration": 8,
    "audio":true
}' https://api.vidu.cn/ent/v2/reference2video
```

- response example:

```json
{
  "task_id": "your_task_id_here",
  "state": "created",
  "model": "viduq3",
  "images": ["your_image_url1","your_image_url2"],
  "prompt": "@1 和 @2 在一起吃火锅，并且旁白音说火锅大家都爱吃。",
  "duration": 8,
  "seed": 12345,
  "aspect_ratio": "3:4",
  "resolution": "1080p",
  "movement_amplitude": "auto",
  "payload":"",
  "off_peak": false,
  "credits": 20,
  "created_at": "2025-01-01T15:41:31.968916Z"
}
```

#### 文生视频

支持模型列表: viduq3-turbo、viduq3-pro、viduq2、viduq1

1.文生视频(api\_id: text2video\_task)

- url: <https://api.vidu.cn/ent/v2/text2video>
- type: POST
- request parameters:

| Name                | Type   | Required | Description                    | Default Value          | Constraints                                                                                                                                                                                                                                                    |
| ------------------- | ------ | -------- | ------------------------------ | ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Authorization       | string | Yes      | API key authentication (Token) | -                      | Header parameter, format: "Token YOUR\_API\_KEY"                                                                                                                                                                                                               |
| Content-Type        | string | Yes      | Data exchange format           | -                      | Header parameter, value: "application/json"                                                                                                                                                                                                                    |
| model               | String | Yes      | Model name                     | -                      | Options: viduq3-turbo, viduq3-pro, viduq2, viduq1viduq3-turbo: Faster generation than viduq3-providuq3-pro: High-quality audio-video content, more vivid and stereoscopicviduq2: Latest modelviduq1: Clear picture, smooth transitions, stable camera movement |
| style               | String | No       | Style                          | general                | Options: general, animegeneral: General style, can be controlled by promptanime: Anime style, performs well in anime styleNote: Not effective for q2, q3 series models                                                                                         |
| prompt              | String | Yes      | Text prompt                    | -                      | Text description for video generation, max 5000 characters                                                                                                                                                                                                     |
| duration            | Int    | No       | Video duration                 | 5 (varies by model)    | viduq3-pro, viduq3-turbo: Default 5s, options: 1-16viduq2: Default 5s, options: 1-10viduq1: Default 5s, options: 5                                                                                                                                             |
| seed                | Int    | No       | Random seed                    | 0                      | When not provided or 0, a random number will be used                                                                                                                                                                                                           |
| aspect\_ratio       | String | No       | Aspect ratio                   | 16:9                   | Options: 16:9, 9:16, 3:4, 4:3, 1:1Note: 3:4, 4:3 only supported by q2, q3 series models                                                                                                                                                                        |
| resolution          | String | No       | Resolution                     | 720p (varies by model) | viduq3-pro, viduq3-turbo (1-16s): Default 720p, options: 540p, 720p, 1080pviduq2 (1-10s): Default 720p, options: 540p, 720p, 1080pviduq1 (5s): Default 1080p, options: 1080p                                                                                   |
| movement\_amplitude | String | No       | Movement amplitude             | auto                   | Options: auto, small, medium, largeNote: Not effective for q2, q3 series models                                                                                                                                                                                |
| bgm                 | Bool   | No       | Add background music           | false                  | Options: true, falsetrue: Auto-select from preset BGM libraryNote: BGM parameter not effective for q2 models when duration is 9s or 10s; not effective for q3 series models                                                                                    |
| audio               | Bool   | No       | Audio-video sync               | true                   | Options: true, falsetrue: Audio-video sync, output video with soundfalse: Silent videoNote: Only q3 series models support this parameter                                                                                                                       |
| payload             | String | No       | Pass-through parameter         | -                      | Max 1048576 characters                                                                                                                                                                                                                                         |
| off\_peak           | Bool   | No       | Off-peak mode                  | false                  | Options: true, falseNote: See pricing for details                                                                                                                                                                                                              |
| watermark           | Bool   | No       | Add watermark                  | false                  | Options: true, false                                                                                                                                                                                                                                           |
| wm\_position        | Int    | No       | Watermark position             | 3                      | Options: 1 (top-left), 2 (top-right), 3 (bottom-right), 4 (bottom-left)                                                                                                                                                                                        |
| wm\_url             | String | No       | Watermark image URL            | -                      | If not provided, uses default AI-generated watermark                                                                                                                                                                                                           |
| meta\_data          | String | No       | Metadata identifier            | -                      | JSON format string, pass-through field                                                                                                                                                                                                                         |
| callback\_url       | String | No       | Callback URL                   | -                      | See callback protocol documentation                                                                                                                                                                                                                            |

- response parameters:

| Name                | Type   | Description                                                              |
| ------------------- | ------ | ------------------------------------------------------------------------ |
| task\_id            | String | Vidu generated task ID                                                   |
| state               | String | Processing statusOptions: created, queueing, processing, success, failed |
| model               | String | Model name used in this call                                             |
| prompt              | String | Prompt parameter used in this call                                       |
| duration            | Int    | Video duration parameter used in this call                               |
| seed                | Int    | Random seed parameter used in this call                                  |
| aspect\_ratio       | String | Aspect ratio parameter used in this call                                 |
| resolution          | String | Resolution parameter used in this call                                   |
| bgm                 | Bool   | Background music parameter used in this call                             |
| movement\_amplitude | String | Movement amplitude parameter used in this call                           |
| payload             | String | Pass-through parameter used in this call                                 |
| off\_peak           | Bool   | Whether off-peak mode was used in this call                              |
| credits             | Int    | Credits used in this call                                                |
| watermark           | Bool   | Whether watermark was used in this call                                  |
| created\_at         | String | Task creation time                                                       |

- request example:

```shell
curl -X POST -H "Authorization: Token {your_api_key}" -H "Content-Type: application/json" -d '
{
    "model": "viduq3-pro",
    "style": "general",
    "prompt": "In an ultra-realistic fashion photography style featuring light blue and pale amber tones, an astronaut in a spacesuit walks through the fog. The background consists of enchanting white and golden lights, creating a minimalist still life and an impressive panoramic scene.",
    "duration": 5,
    "seed": 0,
    "aspect_ratio": "4:3",
    "resolution": "540p",
    "movement_amplitude": "auto",
    "off_peak": false
}' https://api.vidu.cn/ent/v2/text2video
```

- response example:

```json
{
  "task_id": "your_task_id_here",
  "state": "created",
  "model": "viduq3-pro",
  "style": "general",
  "prompt": "In an ultra-realistic fashion photography style featuring light blue and pale amber tones, an astronaut in a spacesuit walks through the fog. The background consists of enchanting white and golden lights, creating a minimalist still life and an impressive panoramic scene.",
  "duration": 5,
  "seed": 12345,
  "aspect_ratio": "4:3",
  "resolution": "540p",
  "movement_amplitude": "auto",
  "payload":"",
  "off_peak": false,
  "credits": 18,
  "created_at": "2025-01-01T15:41:31.968916Z"
}
```

#### 图生视频

支持模型列表: viduq3-turbo、viduq3-pro、viduq3-pro-fast、viduq2-pro-fast、viduq2-pro、viduq2-turbo、viduq1、viduq1-classic、vidu2.0

1.图生视频(api\_id: img2video\_task)

- url: <https://api.vidu.cn/ent/v2/img2video>
- type: POST
- request parameters:

| Name                | Type           | Required | Description                    | Default Value                               | Constraints                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| ------------------- | -------------- | -------- | ------------------------------ | ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Authorization       | string         | Yes      | API key authentication (Token) | -                                           | Header parameter, format: "Token YOUR\_API\_KEY"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| Content-Type        | string         | Yes      | Data exchange format           | -                                           | Header parameter, value: "application/json"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| model               | String         | Yes      | Model name                     | -                                           | Options: viduq3-turbo, viduq3-pro, viduq3-pro-fast, viduq2-pro-fast, viduq2-pro, viduq2-turbo, viduq1, viduq1-classic, vidu2.0viduq3-pro-fast: High-quality audio-video, faster generation, good cost-performanceviduq3-turbo: Faster generation than viduq3-providuq3-pro: High-quality audio-video content, more vivid and stereoscopicviduq2-pro-fast: Lowest price, stable quality, 2-3x faster than viduq2-turboviduq2-pro: New model, good quality, rich detailsviduq2-turbo: New model, good quality, fast generationviduq1: Clear picture, smooth transitions, stable camera movementviduq1-classic: Clear picture, richer transitions and camera movementvidu2.0: Fast generation |
| images              | Array\[String] | Yes      | First frame image              | -                                           | Model will use this image as the first frame to generate videoNote 1: Supports Base64 encoding or image URL (ensure accessible)Note 2: Only 1 image supportedNote 3: Supports png, jpeg, jpg, webp formatsNote 4: Aspect ratio less than 1:4 or 4:1Note 5: Size not exceeding 50 MBNote 6: HTTP POST body not exceeding 20MB                                                                                                                                                                                                                                                                                                                                                               |
| prompt              | String         | No       | Text prompt                    | -                                           | Text description for video generation, max 5000 charactersNote: If is\_rec is used, this parameter will be ignored                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| audio               | Bool           | No       | Audio-video sync               | false (q3-pro, q3-turbo, q3-pro-fast: true) | Options: true, falsetrue: Audio-video sync, output video with soundfalse: Silent videoNote 1: voice\_id parameter only effective when audio is trueNote 2: Only q3 models support off-peak when audio is true                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| audio\_type         | String         | No       | Audio type                     | all                                         | Required when audio is trueOptions: all (sound effects + voice), speech\_only (voice only), sound\_effect\_only (sound effects only)Note: Currently only supports audio separation for q2, q1, 2.0 series models                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| voice\_id           | String         | No       | Voice ID                       | -                                           | Determines the voice in the video, auto-recommended if emptyNote: Not effective for q3 series modelsSee: [Voice List](https://shengshu.feishu.cn/sheets/EgFvs6DShhiEBStmjzccr5gonOg)Or use [Voice Clone API](https://platform.vidu.cn/docs/voice-clone)                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| is\_rec             | Bool           | No       | Use recommended prompt         | false                                       | Options: true, falsetrue: System auto-recommends prompt, recommended prompt count = 1false: Use input promptNote: Enabling recommended prompt costs 10 extra credits per task                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| bgm                 | Bool           | No       | Add background music           | false                                       | Options: true, falsetrue: Auto-select from preset BGM libraryNote: BGM parameter not effective for q2 models when duration is 9s or 10s; not effective for q3 models                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| duration            | Int            | No       | Video duration                 | 5 (varies by model)                         | viduq3-pro, viduq3-turbo, viduq3-pro-fast: Default 5s, options: 1-16viduq2-pro-fast, viduq2-pro, viduq2-turbo: Default 5s, options: 1-10viduq1, viduq1-classic: Default 5s, options: 5vidu2.0: Default 4s, options: 4, 8                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| seed                | Int            | No       | Random seed                    | 0                                           | When not provided or 0, a random number will be used                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| resolution          | String         | No       | Resolution                     | 720p (varies by model)                      | viduq3-pro-fast (1-16s): Default 720p, options: 720p, 1080pviduq3-pro, viduq3-turbo (1-16s): Default 720p, options: 540p, 720p, 1080pviduq2-pro-fast (1-10s): Default 720p, options: 720p, 1080pviduq2-pro, viduq2-turbo (1-10s): Default 720p, options: 540p, 720p, 1080pviduq1, viduq1-classic (5s): Default 1080p, options: 1080pvidu2.0 (4s): Default 360p, options: 360p, 720p, 1080pvidu2.0 (8s): Default 720p, options: 720p                                                                                                                                                                                                                                                        |
| movement\_amplitude | String         | No       | Movement amplitude             | auto                                        | Options: auto, small, medium, largeNote: Not effective for q2, q3 series models                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| payload             | String         | No       | Pass-through parameter         | -                                           | Max 1048576 characters                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| off\_peak           | Bool           | No       | Off-peak mode                  | false                                       | Options: true, falseNote: Only q3 supports off-peak for audio-video sync                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| watermark           | Bool           | No       | Add watermark                  | false                                       | Options: true, false                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| wm\_position        | Int            | No       | Watermark position             | 3                                           | Options: 1 (top-left), 2 (top-right), 3 (bottom-right), 4 (bottom-left)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| wm\_url             | String         | No       | Watermark image URL            | -                                           | If not provided, uses default AI-generated watermark                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| meta\_data          | String         | No       | Metadata identifier            | -                                           | JSON format string, pass-through field                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| callback\_url       | String         | No       | Callback URL                   | -                                           | See callback protocol documentation                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |

- response parameters:

| Name                | Type           | Description                                                              |
| ------------------- | -------------- | ------------------------------------------------------------------------ |
| task\_id            | String         | Vidu generated task ID                                                   |
| state               | String         | Processing statusOptions: created, queueing, processing, success, failed |
| model               | String         | Model name used in this call                                             |
| prompt              | String         | Prompt parameter used in this call                                       |
| images              | Array\[String] | Image parameters used in this call                                       |
| duration            | Int            | Video duration parameter used in this call                               |
| audio               | Bool           | Whether audio-video sync was enabled in this call                        |
| audio\_type         | String         | Audio type output in this call                                           |
| seed                | Int            | Random seed parameter used in this call                                  |
| resolution          | String         | Resolution parameter used in this call                                   |
| movement\_amplitude | String         | Movement amplitude parameter used in this call                           |
| payload             | String         | Pass-through parameter used in this call                                 |
| off\_peak           | Bool           | Whether off-peak mode was used in this call                              |
| credits             | Int            | Credits used in this call                                                |
| watermark           | Bool           | Whether watermark was used in this call                                  |
| created\_at         | String         | Task creation time                                                       |

- request example:

```shell
curl -X POST -H "Authorization: Token {your_api_key}" -H "Content-Type: application/json" -d '
{
    "model": "viduq3-pro",
    "images": ["https://prod-ss-images.s3.cn-northwest-1.amazonaws.com.cn/vidu-maas/template/image2video.png"],
    "prompt": "The astronaut waved and the camera moved up.",
    "audio": true,
    "voice_id": "professional_host",
    "duration": 5,
    "seed": 0,
    "resolution": "1080p",
    "movement_amplitude": "auto",
    "off_peak": false
}' https://api.vidu.cn/ent/v2/img2video
```

- response example:

```json
{
  "task_id": "your_task_id_here",
  "state": "created",
  "model": "viduq3-pro",
  "images": ["https://prod-ss-images.s3.cn-northwest-1.amazonaws.com.cn/vidu-maas/template/image2video.png"],
  "prompt": "The astronaut waved and the camera moved up.",
  "duration": 5,
  "seed": 12345,
  "resolution": "1080p",
  "movement_amplitude": "auto",
  "payload":"",
  "off_peak": false,
  "credits": 16,
  "created_at": "2025-01-01T15:41:31.968916Z"
}
```

#### 首尾帧

支持模型列表: viduq3-turbo、viduq3-pro、viduq2-pro-fast、viduq2-pro、viduq2-turbo、viduq1、viduq1-classic、vidu2.0

1.首尾帧(api\_id: start\_end2video\_task)

- url: <https://api.vidu.cn/ent/v2/start-end2video>
- type: POST
- request parameters:

| Name                | Type           | Required | Description                    | Default Value          | Constraints                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| ------------------- | -------------- | -------- | ------------------------------ | ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Authorization       | string         | Yes      | API key authentication (Token) | -                      | Header parameter, format: "Token YOUR\_API\_KEY"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| Content-Type        | string         | Yes      | Data exchange format           | -                      | Header parameter, value: "application/json"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| model               | String         | Yes      | Model name                     | -                      | Options: viduq3-turbo, viduq3-pro, viduq2-pro-fast, viduq2-pro, viduq2-turbo, viduq1, viduq1-classic, vidu2.0viduq3-turbo: Faster generation than viduq3-providuq3-pro: High-quality audio-video content, more vivid and stereoscopicviduq2-pro-fast: Lowest price, stable quality, 2-3x faster than viduq2-turboviduq2-pro: New model, good quality, rich detailsviduq2-turbo: New model, good quality, fast generationviduq1: Clear picture, smooth transitions, stable camera movementviduq1-classic: Clear picture, richer transitions and camera movementvidu2.0: Fast generation |
| images              | Array\[String] | Yes      | Images                         | -                      | Supports 2 images, first image is start frame, second image is end frameNote 1: Resolution of both images should be similar (ratio between 0.8-1.25)Note 2: Supports Base64 encoding or image URL (ensure accessible)Note 3: Supports png, jpeg, jpg, webp formatsNote 4: Size not exceeding 50MNote 5: HTTP POST body not exceeding 20MB                                                                                                                                                                                                                                              |
| prompt              | String         | No       | Text prompt                    | -                      | Text description for video generation, max 5000 charactersNote: If is\_rec is used, this parameter will be ignored                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| is\_rec             | Bool           | No       | Use recommended prompt         | false                  | Options: true, falseNote: Enabling recommended prompt costs 10 extra credits per task                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| duration            | Int            | No       | Video duration                 | 5 (varies by model)    | viduq3-pro, viduq3-turbo: Default 5s, options: 1-16viduq2-pro-fast, viduq2-pro, viduq2-turbo: Default 5s, options: 1-8viduq1, viduq1-classic: Default 5s, options: 5vidu2.0: Default 4s, options: 4, 8                                                                                                                                                                                                                                                                                                                                                                                 |
| seed                | Int            | No       | Random seed                    | 0                      | When not provided or 0, a random number will be used                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| resolution          | String         | No       | Resolution                     | 720p (varies by model) | viduq3-pro, viduq3-turbo (1-16s): Default 720p, options: 540p, 720p, 1080pviduq2-pro-fast (1-8s): Default 720p, options: 720p, 1080pviduq2-pro, viduq2-turbo (1-8s): Default 720p, options: 540p, 720p, 1080pviduq1, viduq1-classic (5s): Default 1080p, options: 1080pvidu2.0 (4s): Default 360p, options: 360p, 720p, 1080pvidu2.0 (8s): Default 720p, options: 720p                                                                                                                                                                                                                 |
| movement\_amplitude | String         | No       | Movement amplitude             | auto                   | Options: auto, small, medium, largeNote: Not effective for q2, q3 series models                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| audio               | Bool           | No       | Audio-video sync               | true                   | Options: true, falseNote: Only q3 series models support this parameter                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| bgm                 | Bool           | No       | Add background music           | false                  | Options: true, falseNote: Not effective for q3 series models                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| payload             | String         | No       | Pass-through parameter         | -                      | Max 1048576 characters                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| off\_peak           | Bool           | No       | Off-peak mode                  | false                  | Options: true, false                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| watermark           | Bool           | No       | Add watermark                  | false                  | Options: true, false                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| wm\_position        | Int            | No       | Watermark position             | 3                      | Options: 1 (top-left), 2 (top-right), 3 (bottom-right), 4 (bottom-left)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| wm\_url             | String         | No       | Watermark image URL            | -                      | If not provided, uses default AI-generated watermark                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| meta\_data          | String         | No       | Metadata identifier            | -                      | JSON format string, pass-through field                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| callback\_url       | String         | No       | Callback URL                   | -                      | See callback protocol documentation                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |

- response parameters:

| Name                | Type           | Description                                                              |
| ------------------- | -------------- | ------------------------------------------------------------------------ |
| task\_id            | String         | Vidu generated task ID                                                   |
| state               | String         | Processing statusOptions: created, queueing, processing, success, failed |
| model               | String         | Model name used in this call                                             |
| prompt              | String         | Prompt parameter used in this call                                       |
| images              | Array\[String] | Image parameters used in this call                                       |
| duration            | Int            | Video duration parameter used in this call                               |
| seed                | Int            | Random seed parameter used in this call                                  |
| resolution          | String         | Resolution parameter used in this call                                   |
| bgm                 | Bool           | Background music parameter used in this call                             |
| movement\_amplitude | String         | Movement amplitude parameter used in this call                           |
| payload             | String         | Pass-through parameter used in this call                                 |
| off\_peak           | Bool           | Whether off-peak mode was used in this call                              |
| credits             | Int            | Credits used in this call                                                |
| watermark           | Bool           | Whether watermark was used in this call                                  |
| created\_at         | String         | Task creation time                                                       |

- request example:

```shell
curl -X POST -H "Authorization: Token {your_api_key}" -H "Content-Type: application/json" -d '
{
    "model": "viduq3-pro",
    "images": ["https://prod-ss-images.s3.cn-northwest-1.amazonaws.com.cn/vidu-maas/template/startend2video-1.jpeg","https://prod-ss-images.s3.cn-northwest-1.amazonaws.com.cn/vidu-maas/template/startend2video-2.jpeg"],
    "prompt": "The camera zooms in on the bird, which then flies to the right. With its flight being smooth and natural, the bird soars in the sky. with a red light effect following and surrounding it from behind.",
    "duration": 5,
    "seed": 0,
    "resolution": "1080p",
    "audio": true,
    "off_peak": false
}' https://api.vidu.cn/ent/v2/start-end2video
```

- response example:

```json
{
  "task_id": "your_task_id_here",
  "state": "created",
  "model": "viduq3-pro",
  "images": ["https://prod-ss-images.s3.cn-northwest-1.amazonaws.com.cn/vidu-maas/template/startend2video-1.jpeg","https://prod-ss-images.s3.cn-northwest-1.amazonaws.com.cn/vidu-maas/template/startend2video-2.jpeg"],
  "prompt": "The camera zooms in on the bird, which then flies to the right. The bird's flight is smooth and natural, with a red light effect following and surrounding it from behind.",
  "duration": 5,
  "seed": 12345,
  "resolution": "1080p",
  "audio": true,
  "payload":"",
  "off_peak": false,
  "credits": 14,
  "created_at": "2025-01-01T15:41:31.968916Z"
}
```

#### 智能多帧

支持模型列表: viduq2-turbo、viduq2-pro

1.智能多帧(api\_id: multiframe\_task)

- url: <https://api.vidu.cn/ent/v2/multiframe>
- type: POST
- request parameters:

| Name                       | Type   | Required | Description                              | Default Value | Constraints                                                                                                                                                                                                                                                                                                                                                                |
| -------------------------- | ------ | -------- | ---------------------------------------- | ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Authorization              | string | Yes      | API key authentication (Token)           | -             | Header parameter, format: "Token YOUR\_API\_KEY"                                                                                                                                                                                                                                                                                                                           |
| Content-Type               | string | Yes      | Data exchange format                     | -             | Header parameter, value: "application/json"                                                                                                                                                                                                                                                                                                                                |
| model                      | String | Yes      | Model name                               | -             | Options: viduq2-turbo, viduq2-pro                                                                                                                                                                                                                                                                                                                                          |
| start\_image               | String | Yes      | Start frame image                        | -             | Note 1: Supports Base64 encoding or image URL (ensure accessible)Note 2: Only 1 image supportedNote 3: Supports png, jpeg, jpg, webp formatsNote 4: Aspect ratio less than 1:4 or 4:1Note 5: Size not exceeding 50 MBNote 6: HTTP POST body not exceeding 10MB                                                                                                             |
| image\_settings            | Array  | Yes      | Key frame configuration                  | -             | Max 9 key frames, min 2 key frames per task                                                                                                                                                                                                                                                                                                                                |
| image\_settings.prompt     | String | No       | Prompt for extending from previous image | -             | Controls the extended video content                                                                                                                                                                                                                                                                                                                                        |
| image\_settings.key\_image | String | Yes      | Middle frame reference image             | -             | Model will use this image as end frame to generate videoNote 1: Supports Base64 encoding or image URL (ensure accessible)Note 2: Only 1 image supportedNote 3: Input order is timeline order (start to end)Note 4: Supports png, jpeg, jpg, webp formatsNote 5: Aspect ratio less than 1:4 or 4:1Note 6: Size not exceeding 50 MBNote 7: HTTP POST body not exceeding 20MB |
| image\_settings.duration   | Int    | No       | Multi-frame duration                     | 5             | Video duration between different key frames, options: 2-7 seconds                                                                                                                                                                                                                                                                                                          |
| resolution                 | String | No       | Video resolution                         | 720p          | Options: 540p, 720p, 1080p                                                                                                                                                                                                                                                                                                                                                 |
| watermark                  | Bool   | No       | Add watermark                            | false         | Options: true, falseNote: Watermark content is fixed, AI-generated by default                                                                                                                                                                                                                                                                                              |
| wm\_url                    | String | No       | Watermark image URL                      | -             | If watermark is enabled but no custom URL provided, uses default AI-generated watermark                                                                                                                                                                                                                                                                                    |
| wm\_position               | String | No       | Watermark position                       | bottom\_left  | Options: top\_left, top\_right, bottom\_right, bottom\_leftNot effective if watermark is not added                                                                                                                                                                                                                                                                         |
| meta\_data                 | String | No       | Metadata identifier                      | -             | JSON format string, pass-through field                                                                                                                                                                                                                                                                                                                                     |
| payload                    | String | No       | Pass-through parameter                   | -             | Max 1048576 characters                                                                                                                                                                                                                                                                                                                                                     |
| callback\_url              | String | No       | Callback URL                             | -             | See callback protocol documentation                                                                                                                                                                                                                                                                                                                                        |

- response parameters:

| Name                       | Type   | Description                                                              |
| -------------------------- | ------ | ------------------------------------------------------------------------ |
| task\_id                   | String | Vidu generated task ID                                                   |
| state                      | String | Processing statusOptions: created, queueing, processing, success, failed |
| model                      | String | Model name used in this call                                             |
| start\_image               | String | Start frame image parameter used in this call                            |
| image\_settings            | Array  | Multi-frame configuration used in this call                              |
| image\_settings.prompt     | String | Prompt used in this task                                                 |
| image\_settings.key\_image | String | End frame image parameter used in this call                              |
| image\_settings.duration   | String | Duration used in this call                                               |
| resolution                 | String | Resolution parameter used in this call                                   |
| watermark                  | Bool   | Whether watermark was used in this call                                  |
| wm\_url                    | String | Watermark content used in this task                                      |
| wm\_position               | String | Watermark position used in this task                                     |
| meta\_data                 | String | Metadata identifier used in this task                                    |
| payload                    | String | Pass-through parameter used in this call                                 |
| credits                    | Int    | Credits used in this call                                                |
| created\_at                | String | Task creation time                                                       |

- request example:

```shell
curl -X POST -H "Authorization: Token {your_api_key}" -H "Content-Type: application/json" -d '
{
    "model": "viduq2-turbo",
    "start_image": "start_image",
    "image_settings": [
    {
      "prompt": "your_prompt1",
      "key_image": "your_key_image1",
      "duration": 5
    },
    {
      "prompt": "your_prompt2",
      "key_image": "your_key_image2",
      "duration": 5
    },
    {
      "prompt": "your_prompt3",
      "key_image": "your_key_image3",
      "duration": 5
    }
  ],
    "resolution": "1080p"
}' https://api.vidu.cn/ent/v2/multiframe
```

- response example:

```json
{
    "task_id": "your_task_id",
    "state": "success",
    "model": "viduq2-turbo",
    "start_image": "your_start_image",
    "image_settings": [
        {
            "key_image": "your_key_image1",
            "prompt": "",
            "duration": 5
        },
        {
            "key_image": "your_key_image2",
            "prompt": "",
            "duration": 5
        },
        {
            "key_image": "your_key_image3",
            "prompt": "",
            "duration": 5
        },
        {
            "key_image": "your_key_image4",
            "prompt": "",
            "duration": 5
        },
        {
            "key_image": "your_key_image5",
            "prompt": "",
            "duration": 5
        }
    ],
    "resolution": "1080p",
    "watermark": false,
    "wm_url": "",
    "wm_position": "unspecified",
    "meta_data": "",
    "payload": "",
    "credits": 40,
    "created_at": "2025-11-11T03:07:57.538965937Z"
}
```

### 特效模板

#### 场景特效模板

支持模型列表: Vidu Template Models

1.场景特效模板(api\_id: template\_task)

- url: <https://api.vidu.cn/ent/v2/template>
- type: POST
- request parameters:

| Name          | Type           | Required | Description                      | Default Value | Constraints                                                                                                                                                                                                                                                                   |
| ------------- | -------------- | -------- | -------------------------------- | ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Authorization | string         | Yes      | API key authentication (Token)   | -             | Header parameter, format: "Token YOUR\_API\_KEY"                                                                                                                                                                                                                              |
| Content-Type  | string         | Yes      | Data exchange format             | -             | Header parameter, value: "application/json"                                                                                                                                                                                                                                   |
| template      | String         | Yes      | Scene template parameter         | -             | Different templates have different parametersSee: [Scene Template Center](https://platform.vidu.cn/docs/templates)                                                                                                                                                            |
| images        | Array\[String] | Yes      | Images                           | -             | Model will use these images to generate videoNote 1: Supports Base64 encoding or image URL (ensure accessible)Note 2: Supports png, jpeg, jpg, webp formatsNote 3: Aspect ratio less than 1:4 or 4:1Note 4: Size not exceeding 50 MBNote 5: HTTP POST body not exceeding 20MB |
| prompt        | String         | No       | Text prompt                      | -             | Text description for video generation, max 2000 charactersNote: Not required when template is subject\_3 or pubg\_winner\_hit                                                                                                                                                 |
| seed          | Int            | No       | Random seed                      | 0             | When not provided or 0, a random number will be used                                                                                                                                                                                                                          |
| aspect\_ratio | String         | No       | Aspect ratio                     | 16:9          | Options: 16:9, 9:16Note: Different templates support different options                                                                                                                                                                                                        |
| area          | String         | No       | Exotic princess effect parameter | auto          | Only available when template is exotic\_princessOptions: denmark, uk, africa, china, mexico, switzerland, russia, italy, korea, thailand, india, japan                                                                                                                        |
| beast         | String         | No       | Beast companion effect parameter | auto          | Only available when template is beast\_companionOptions: bear, tiger, elk, snake, lion, wolf                                                                                                                                                                                  |
| bgm           | Bool           | No       | Add background music             | false         | Options: true, falsetrue: Auto-select from preset BGM library                                                                                                                                                                                                                 |
| payload       | String         | No       | Pass-through parameter           | -             | Max 1048576 characters                                                                                                                                                                                                                                                        |
| watermark     | Bool           | No       | Add watermark                    | false         | Options: true, false                                                                                                                                                                                                                                                          |
| wm\_position  | Int            | No       | Watermark position               | 3             | Options: 1 (top-left), 2 (top-right), 3 (bottom-right), 4 (bottom-left)                                                                                                                                                                                                       |
| wm\_url       | String         | No       | Watermark image URL              | -             | If not provided, uses default AI-generated watermark                                                                                                                                                                                                                          |
| meta\_data    | String         | No       | Metadata identifier              | -             | JSON format string, pass-through field                                                                                                                                                                                                                                        |
| callback\_url | String         | No       | Callback URL                     | -             | See callback protocol documentation                                                                                                                                                                                                                                           |

- response parameters:

| Name          | Type           | Description                                                              |
| ------------- | -------------- | ------------------------------------------------------------------------ |
| task\_id      | String         | Vidu generated task ID                                                   |
| state         | String         | Processing statusOptions: created, queueing, processing, success, failed |
| template      | String         | Scene parameter used in this call                                        |
| prompt        | String         | Prompt parameter used in this call                                       |
| images        | Array\[String] | Image parameters used in this call                                       |
| seed          | Int            | Random seed parameter used in this call                                  |
| aspect\_ratio | String         | Aspect ratio parameter used in this call                                 |
| bgm           | Bool           | Background music parameter used in this call                             |
| payload       | String         | Pass-through parameter used in this call                                 |
| watermark     | Bool           | Whether watermark was used in this call                                  |
| credits       | Int            | Credits used in this call                                                |
| created\_at   | String         | Task creation time                                                       |

- request example:

```shell
curl -X POST -H "Authorization: Token {your_api_key}" -H "Content-Type: application/json" -d '
{
    "template": "hugging",
    "images": ["https://prod-ss-images.s3.cn-northwest-1.amazonaws.com.cn/vidu-maas/scene-template/hug.jpeg"],
    "prompt": "Video content\\n画面中的两个主体转向彼此，并开始拥抱# 要求\\n将Motion Level设置为'Large'",
    "seed": 0
}' https://api.vidu.cn/ent/v2/template
```

- response example:

```json
{
  "task_id": "your_task_id_here",
  "state": "created",
  "template": "hug",
  "images": ["https://prod-ss-images.s3.cn-northwest-1.amazonaws.com.cn/vidu-maas/scene-template/hug.jpeg"],
  "prompt": "hug",
  "seed": 12345,
  "payload":"",
  "credits": 10,
  "created_at": "2025-01-01T15:41:31.968916Z"
}
```

#### 模板成片

支持模型列表: Vidu Story Template Models

1.模板成片(api\_id: template\_story\_task)

- url: <https://api.vidu.cn/ent/v2/template-story>
- type: POST
- request parameters:

| Name          | Type           | Required | Description                    | Default Value | Constraints                                                                                                                                                                                                                                                                                                                                                 |
| ------------- | -------------- | -------- | ------------------------------ | ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Authorization | string         | Yes      | API key authentication (Token) | -             | Header parameter, format: "Token YOUR\_API\_KEY"                                                                                                                                                                                                                                                                                                            |
| Content-Type  | string         | Yes      | Data exchange format           | -             | Header parameter, value: "application/json"                                                                                                                                                                                                                                                                                                                 |
| story         | String         | Yes      | Story template parameter       | -             | Options: love\_story, workday\_feels, monkey\_king, pigsy, monk\_tang, one\_shot                                                                                                                                                                                                                                                                            |
| images        | Array\[String] | Yes      | Images                         | -             | Model will use these images to generate videoNote 1: Supports Base64 encoding or image URL (ensure accessible)Note 2: Supports png, jpeg, jpg, webp formatsNote 3: See scene template center for aspect ratio requirementsNote 4: one\_shot video aspect ratio same as input imageNote 5: Size not exceeding 50 MBNote 6: HTTP POST body not exceeding 20MB |
| payload       | String         | No       | Pass-through parameter         | -             | Max 1048576 characters                                                                                                                                                                                                                                                                                                                                      |
| callback\_url | String         | No       | Callback URL                   | -             | See callback protocol documentation                                                                                                                                                                                                                                                                                                                         |

- response parameters:

| Name        | Type           | Description                                                              |
| ----------- | -------------- | ------------------------------------------------------------------------ |
| task\_id    | String         | Vidu generated task ID                                                   |
| state       | String         | Processing statusOptions: created, queueing, processing, success, failed |
| story       | String         | Story template parameter used in this call                               |
| images      | Array\[String] | Image parameters used in this call                                       |
| payload     | String         | Pass-through parameter used in this call                                 |
| credits     | Int            | Credits used in this call                                                |
| created\_at | String         | Task creation time                                                       |

- request example:

```shell
curl -X POST -H "Authorization: Token {your_api_key}" -H "Content-Type: application/json" -d '
{
    "story": "choose_one_accept_value",
    "images":["input_your_images"]
}' https://api.vidu.cn/ent/v2/template-story
```

- response example:

```json
{
  "task_id": "your_task_id_here",
  "state": "created",
  "story": "your_choose_value",
  "images": ["input_your_images"],
  "payload":"",
  "credits": 25,
  "created_at": "2025-01-01T15:41:31.968916Z"
}
```

### 任务管理

#### 查询任务

支持模型列表: All Vidu Models

1.查询任务(api\_id: query\_task)

- url: <https://api.vidu.cn/ent/v2/tasks/{task_id}>
- type: GET
- request parameters:

| Name          | Type   | Required | Description                    | Default Value | Constraints                                      |
| ------------- | ------ | -------- | ------------------------------ | ------------- | ------------------------------------------------ |
| Authorization | string | Yes      | API key authentication (Token) | -             | Header parameter, format: "Token YOUR\_API\_KEY" |
| task\_id      | string | Yes      | Task ID to query               | -             | Path parameter                                   |

- response parameters:

| Name             | Type   | Description                                                              |
| ---------------- | ------ | ------------------------------------------------------------------------ |
| task\_id         | String | Vidu generated task ID                                                   |
| state            | String | Processing statusOptions: created, queueing, processing, success, failed |
| model            | String | Model name used in this call                                             |
| prompt           | String | Prompt parameter used in this call                                       |
| created\_at      | String | Task creation time                                                       |
| finished\_at     | String | Task completion time (if completed)                                      |
| video\_url       | String | Generated video URL (when state is success)                              |
| watermarked\_url | String | Watermarked video URL (if watermark was enabled)                         |
| credits          | Int    | Credits used in this call                                                |
| failed\_reason   | String | Failure reason (if state is failed)                                      |

- request example:

```shell
curl -X GET -H "Authorization: Token {your_api_key}" https://api.vidu.cn/ent/v2/tasks/your_task_id
```

- response example:

```json
{
  "task_id": "your_task_id",
  "state": "success",
  "model": "viduq3-pro",
  "prompt": "A beautiful sunset over mountains",
  "created_at": "2025-01-01T15:41:31.968916Z",
  "finished_at": "2025-01-01T15:45:31.968916Z",
  "video_url": "https://cdn.vidu.cn/videos/your_video.mp4",
  "watermarked_url": "https://cdn.vidu.cn/videos/your_video_watermarked.mp4",
  "credits": 15
}
```

#### 取消任务

支持模型列表: All Vidu Models

1.取消任务(api\_id: cancel\_task)

- url: <https://api.vidu.cn/ent/v2/tasks/{task_id}/cancel>
- type: POST
- request parameters:

| Name          | Type   | Required | Description                    | Default Value | Constraints                                      |
| ------------- | ------ | -------- | ------------------------------ | ------------- | ------------------------------------------------ |
| Authorization | string | Yes      | API key authentication (Token) | -             | Header parameter, format: "Token YOUR\_API\_KEY" |
| task\_id      | string | Yes      | Task ID to cancel              | -             | Path parameter                                   |

- response parameters:

| Name     | Type   | Description                    |
| -------- | ------ | ------------------------------ |
| task\_id | String | Vidu generated task ID         |
| state    | String | Task status after cancellation |
| message  | String | Cancellation result message    |

- request example:

```shell
curl -X POST -H "Authorization: Token {your_api_key}" https://api.vidu.cn/ent/v2/tasks/your_task_id/cancel
```

- response example:

```json
{
  "task_id": "your_task_id",
  "state": "cancelled",
  "message": "Task cancelled successfully"
}
```

### Http Status Code

All Vidu API endpoints use standard HTTP status codes to indicate the success or failure of a request.

| Status Code | Description                         |
| ----------- | ----------------------------------- |
| 200         | Request successful                  |
| 201         | Resource created successfully       |
| 400         | The request is invalid or malformed |
| 401         | Authentication failed               |
| 403         | Permission denied                   |
| 404         | Resource not found                  |
| 422         | Content rejected by safety filters  |
| 429         | Rate limit exceeded                 |
| 500         | An unexpected error occurred        |
| 503         | Service temporarily unavailable     |
| 504         | Request timeout                     |

### Supported Models

Vidu offers a comprehensive suite of AI video generation models designed for different use cases and quality requirements.

#### Model Series

**Vidu Q3 Series**

- **viduq3-mix**: Strong picture quality, smart scene cutting, audio-video sync, good dynamics, best balance
- **viduq3-turbo**: Smart scene cutting, audio-video sync, fastest generation, best cost-performance
- **viduq3-pro**: Smart scene cutting, audio-video sync, better multi-camera consistency
- **viduq3-pro-fast**: High-quality audio-video, faster generation, good cost-performance

**Vidu Q2 Series**

- **viduq2-pro**: Supports reference video, video editing, video replacement
- **viduq2-pro-fast**: Lowest price, stable quality, 2-3x faster than viduq2-turbo
- **viduq2-turbo**: New model, good quality, fast generation
- **viduq2**: Good dynamics, rich details

**Vidu Q1 Series**

- **viduq1**: Clear picture, smooth transitions, stable camera movement
- **viduq1-classic**: Clear picture, richer transitions and camera movement

**Vidu 2.0 Series**

- **vidu2.0**: Fast generation

#### Feature Comparison

| Feature             | Q3 Series | Q2 Series    | Q1 Series | Vidu 2.0 |
| ------------------- | --------- | ------------ | --------- | -------- |
| Audio-Video Sync    | ✓         | ✓ (limited)  | ✗         | ✗        |
| Smart Scene Cutting | ✓         | ✗            | ✗         | ✗        |
| Reference Video     | ✗         | ✓ (pro only) | ✗         | ✗        |
| Multi-Subject       | ✓         | ✓            | ✓         | ✓        |
| Off-Peak Mode       | ✓         | ✓            | ✓         | ✓        |
| Max Duration        | 16s       | 10s          | 5s        | 8s       |
| Max Resolution      | 1080p     | 1080p        | 1080p     | 1080p    |

#### Resolution Support

**Q3 Series Models**

- 540p: 960x540 (landscape), 540x960 (portrait)
- 720p: 1280x720 (landscape), 720x1280 (portrait)
- 1080p: 1920x1080 (landscape), 1080x1920 (portrait)

**Q2 Series Models**

- 540p: 960x540 (landscape), 540x960 (portrait)
- 720p: 1280x720 (landscape), 720x1280 (portrait)
- 1080p: 1920x1080 (landscape), 1080x1920 (portrait)

**Q1 Series Models**

- 1080p: 1920x1080 (landscape), 1080x1920 (portrait)

**Vidu 2.0 Models**

- 360p: 640x360 (landscape), 360x640 (portrait)
- 720p: 1280x720 (landscape), 720x1280 (portrait)
- 1080p: 1920x1080 (landscape), 1080x1920 (portrait)

#### Aspect Ratio Support

**Q3 Series**

- 16:9 (landscape)
- 9:16 (portrait)
- 3:4 (portrait)
- 4:3 (landscape)
- 1:1 (square)

**Q2 Series**

- 16:9 (landscape)
- 9:16 (portrait)
- 3:4 (portrait)
- 4:3 (landscape)
- 1:1 (square)
- 21:9 (ultrawide)
- 2:3 (portrait)
- 3:2 (landscape)
- Any custom aspect ratio

**Q1 Series**

- 16:9 (landscape)
- 9:16 (portrait)
- 1:1 (square)
- 3:4 (portrait)
- 4:3 (landscape)

**Vidu 2.0**

- 16:9 (landscape)
- 9:16 (portrait)

#### Pricing

For detailed pricing information, please visit the [Vidu Pricing Page](https://platform.vidu.cn/docs/pricing).
