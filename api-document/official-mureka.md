- 服务商：Mureka
- 官网：[https://www.mureka.ai/](https://www.mureka.ai/)
- 充值：[https://www.mureka.ai/pricing](https://www.mureka.ai/pricing)
- 修订日期：2026-04-08

### 目录

- [认证说明](#认证说明)
- [速率限制](#速率限制)
- [Lyrics Generate](#lyrics-generate)
  - [Generate Lyrics](#generate-lyrics)
  - [Extend Lyrics](#extend-lyrics)
- [Song Generate](#song-generate)
  - [Generate Song](#generate-song)
  - [Query Task](#query-task)
  - [Extend Song](#extend-song)
  - [Recognize Song](#recognize-song)
  - [Describe Song](#describe-song)
  - [Stem Song](#stem-song)
- [Vocal](#vocal)
  - [Vocal Cloning](#vocal-cloning)
- [Instrumental](#instrumental)
  - [Generate Instrumental](#generate-instrumental)
  - [Query Instrumental Task](#query-instrumental-task)
- [Text to Speech](#text-to-speech)
  - [Create Speech](#create-speech)
  - [Create Podcast](#create-podcast)
- [Error Code](#error-code)

### 认证说明

Mureka API 使用 Bearer Token 进行认证。在请求头中添加 `Authorization: Bearer $MUREKA_API_KEY` 即可完成认证。

### 速率限制

具体速率限制请参考官方文档或联系客服获取最新信息。

### Upload File

支持模型列表: Mureka File Upload Model

1.Task Submission(api_id: file_upload_task_submission)

- url: https://api.mureka.ai/v1/files/upload
- type: POST
- content type: multipart/form-data
- description: Upload a file that can be used across various endpoints. Individual files can be up to 10 MB.
- request parameters:

| Name | Type | Required | Description | Default Value | Constraints |
| ---- | ---- | -------- | ----------- | ------------- | ----------- |
| file | binary | Yes | The File object (not file name) to be uploaded | - | Supported format: mp3, m4a, mid. Max size: 10MB |
| purpose | string | Yes | The intended purpose of the uploaded file | - | Valid values: reference, vocal, melody, instrumental, voice, audio |

- purpose constraints:
  - reference: Supported format (mp3, m4a). Audio duration: 30 seconds, excess will be trimmed
  - vocal: Supported format (mp3, m4a). Vocal duration: 15-30 seconds, excess will be trimmed
  - melody: Supported format (mp3, m4a, mid). Audio duration: 5-60 seconds, excess will be trimmed. MIDI file is recommended
  - instrumental: Supported format (mp3, m4a). Audio duration: 30 seconds, excess will be trimmed
  - voice: Supported format (mp3, m4a). Audio duration: 5-15 seconds, excess will be trimmed
  - audio: Supported format (mp3, m4a). Common audio file for song extension and similar purposes

- response parameters:

| Name | Type | Description |
| ---- | ---- | ----------- |
| id | string | The file identifier, which can be referenced in the API endpoints |
| bytes | integer | The size of the file, in bytes |
| created_at | integer | The Unix timestamp (in seconds) for when the file was created |
| filename | string | The name of the file |
| purpose | string | The intended purpose of the file |

- request example:

```shell
curl https://api.mureka.ai/v1/files/upload \
  -H "Authorization: Bearer $MUREKA_API_KEY" \
  -F purpose="reference" \
  -F file="@mydata.mp3"
```

- response example:

```json
{
  "id": "file_abc123",
  "bytes": 5242880,
  "created_at": 1712544000,
  "filename": "mydata.mp3",
  "purpose": "reference"
}
```

### Lyrics Generate

#### Generate Lyrics

支持模型列表: Mureka Lyrics Model

1.Task Submission(api_id: lyrics_generate_task_submission)

- url: <https://api.mureka.ai/v1/lyrics/generate>
- type: POST
- request parameters:

| Name | Type | Required | Description | Default Value | Constraints |
| ---- | ---- | -------- | ----------- | ------------- | ----------- |
| prompt | string | Yes | The prompt to generate lyrics for | - | - |

- response parameters:

| Name | Type | Description |
| ---- | ---- | ----------- |
| title | string | The title generated based on the prompt |
| lyrics | string | The lyrics generated based on the prompt |

- request example:

```shell
curl https://api.mureka.ai/v1/lyrics/generate \
  -H "Authorization: Bearer $MUREKA_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "Embrace of Night"
  }'
```

- response example:

```json
{
  "title": "Embrace of Night",
  "lyrics": "In the shadows we dance tonight\nUnder moonlight so bright\nThe darkness holds us close\nIn this eternal embrace..."
}
```

#### Extend Lyrics

支持模型列表: Mureka Lyrics Model

1.Task Submission(api_id: lyrics_extend_task_submission)

- url: <https://api.mureka.ai/v1/lyrics/extend>
- type: POST
- request parameters:

| Name | Type | Required | Description | Default Value | Constraints |
| ---- | ---- | -------- | ----------- | ------------- | ----------- |
| lyrics | string | Yes | Lyrics to be continued | - | - |

- response parameters:

| Name | Type | Description |
| ---- | ---- | ----------- |
| lyrics | string | The lyrics extended based on the input lyrics |

- request example:

```shell
curl https://api.mureka.ai/v1/lyrics/extend \
  -H "Authorization: Bearer $MUREKA_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "lyrics": "[Verse]\nIn the stormy night, I wander alone\nLost in the rain, feeling like I have been thrown\nMemories of you, they flash before my eyes\nHoping for a moment, just to find some bliss"
  }'
```

- response example:

```json
{
  "lyrics": "[Verse]\nIn the stormy night, I wander alone\nLost in the rain, feeling like I have been thrown\nMemories of you, they flash before my eyes\nHoping for a moment, just to find some bliss\n[Chorus]\nSearching for the light in this endless night..."
}
```

### Song Generate

#### Generate Song

支持模型列表: mureka-7.5, mureka-7.6, mureka-o2, mureka-8

1.Task Submission(api_id: song_generate_task_submission)

- url: <https://api.mureka.ai/v1/song/generate>
- type: POST
- request parameters:

| Name | Type | Required | Description | Default Value | Constraints |
| ---- | ---- | -------- | ----------- | ------------- | ----------- |
| lyrics | string | Yes | Lyrics for generated song | - | Maximum 3000 characters |
| model | string | No | The model to use | auto | Valid values: auto, mureka-7.5, mureka-7.6, mureka-o2, mureka-8 |
| n | integer | No | How many songs to generate for each request | 2 | Maximum 3 |
| prompt | string | No | Control music generation by inputting a prompt | - | Maximum 1024 characters |
| reference_id | string | No | Control music generation by referencing music | - | Generated through the files/upload API |
| vocal_id | string | No | Control music generation by any voice you like | - | Generated through the files/upload API |
| melody_id | string | No | Control music generation by melody idea | - | Generated through the files/upload API |
| stream | boolean | No | Enable streaming phase for playback while generating | false | Not supported when model is mureka-o1 |

- response parameters:

| Name | Type | Description |
| ---- | ---- | ----------- |
| id | string | Task ID of the asynchronous song generation task |
| created_at | integer | The Unix timestamp (in seconds) for when the task was created |
| finished_at | integer | The Unix timestamp (in seconds) for when the task was finished |
| model | string | The model used for song generation |
| status | string | The current status of the task: preparing, queued, running, streaming, succeeded, failed, timeouted, cancelled |
| failed_reason | string | The reason for the failure |
| choices | object[] | The generated songs, when the status is succeeded |

- request example:

```shell
curl https://api.mureka.ai/v1/song/generate \
  -H "Authorization: Bearer $MUREKA_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "lyrics": "[Verse]\nIn the stormy night, I wander alone\nLost in the rain, feeling like I have been thrown\nMemories of you, they flash before my eyes\nHoping for a moment, just to find some bliss",
    "model": "auto",
    "prompt": "r&b, slow, passionate, male vocal"
  }'
```

- response example:

```json
{
  "id": "song_task_123456",
  "created_at": 1712544000,
  "finished_at": null,
  "model": "mureka-7.6",
  "status": "queued",
  "failed_reason": null,
  "choices": null
}
```

#### Query Task

支持模型列表: All Mureka Models

1.Task Query(api_id: song_query_task)

- url: <https://api.mureka.ai/v1/song/query/{task_id}>
- type: GET
- request parameters:

| Name | Type | Required | Description | Default Value | Constraints |
| ---- | ---- | -------- | ----------- | ------------- | ----------- |
| task_id | string | Yes | The task_id of the song generation task | - | - |

- response parameters:

| Name | Type | Description |
| ---- | ---- | ----------- |
| id | string | Task ID of the asynchronous song generation task |
| created_at | integer | The Unix timestamp (in seconds) for when the task was created |
| finished_at | integer | The Unix timestamp (in seconds) for when the task was finished |
| model | string | The model used for song generation |
| status | string | The current status of the task: preparing, queued, running, streaming, succeeded, failed, timeouted, cancelled |
| failed_reason | string | The reason for the failure |
| choices | object[] | The generated songs, when the status is succeeded |

- request example:

```shell
curl https://api.mureka.ai/v1/song/query/435134 \
  -H "Authorization: Bearer $MUREKA_API_KEY"
```

- response example:

```json
{
  "id": "song_task_123456",
  "created_at": 1712544000,
  "finished_at": 1712544300,
  "model": "mureka-7.6",
  "status": "succeeded",
  "failed_reason": null,
  "choices": [
    {
      "id": "song_001",
      "audio_url": "https://cdn.mureka.ai/songs/song_001.mp3",
      "duration": 180
    }
  ]
}
```

#### Extend Song

支持模型列表: All Mureka Models

1.Task Submission(api_id: song_extend_task_submission)

- url: <https://api.mureka.ai/v1/song/extend>
- type: POST
- request parameters:

| Name | Type | Required | Description | Default Value | Constraints |
| ---- | ---- | -------- | ----------- | ------------- | ----------- |
| song_id | string | No | Song ID for extending | - | Mutually exclusive with upload_audio_id |
| upload_audio_id | string | No | Upload ID of the song to be extended | - | Mutually exclusive with song_id |
| lyrics | string | Yes | The lyrics to be extended | - | - |
| extend_at | integer | Yes | Extending start time (milliseconds) | - | Valid range: [8000, 420000] |

- response parameters:

| Name | Type | Description |
| ---- | ---- | ----------- |
| id | string | Task ID of the asynchronous song generation task |
| created_at | integer | The Unix timestamp (in seconds) for when the task was created |
| finished_at | integer | The Unix timestamp (in seconds) for when the task was finished |
| model | string | The model used for song generation |
| status | string | The current status of the task: preparing, queued, running, streaming, succeeded, failed, timeouted, cancelled |
| failed_reason | string | The reason for the failure |
| choices | object[] | The generated songs, when the status is succeeded |

- request example:

```shell
curl https://api.mureka.ai/v1/song/extend \
  -H "Authorization: Bearer $MUREKA_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "upload_audio_id": "43543541",
    "lyrics": "[Verse]\nIn the stormy night, I wander alone\nLost in the rain, feeling like I have been thrown\nMemories of you, they flash before my eyes\nHoping for a moment, just to find some bliss",
    "extend_at": 12234
  }'
```

- response example:

```json
{
  "id": "extend_task_789012",
  "created_at": 1712544000,
  "finished_at": null,
  "model": "mureka-7.6",
  "status": "queued",
  "failed_reason": null,
  "choices": null
}
```

#### Recognize Song

支持模型列表: Mureka Recognize Model

1.Task Submission(api_id: song_recognize_task_submission)

- url: <https://api.mureka.ai/v1/song/recognize>
- type: POST
- request parameters:

| Name | Type | Required | Description | Default Value | Constraints |
| ---- | ---- | -------- | ----------- | ------------- | ----------- |
| upload_audio_id | string | Yes | Upload ID of the song to be recognized | - | Generated through the files/upload API (purpose: audio) |

- response parameters:

| Name | Type | Description |
| ---- | ---- | ----------- |
| duration | integer | Song duration in milliseconds |
| lyrics_sections | object[] | Lyrics section information, including timestamps |

- request example:

```shell
curl https://api.mureka.ai/v1/song/recognize \
  -H "Authorization: Bearer $MUREKA_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "upload_audio_id": "43543541"
  }'
```

- response example:

```json
{
  "duration": 180000,
  "lyrics_sections": [
    {
      "start_time": 0,
      "end_time": 30000,
      "lyrics": "[Verse]\nIn the stormy night..."
    }
  ]
}
```

#### Describe Song

支持模型列表: Mureka Describe Model

1.Task Submission(api_id: song_describe_task_submission)

- url: <https://api.mureka.ai/v1/song/describe>
- type: POST
- request parameters:

| Name | Type | Required | Description | Default Value | Constraints |
| ---- | ---- | -------- | ----------- | ------------- | ----------- |
| url | string | Yes | The URL of the song to be processed | - | Supported formats: mp3, m4a. Max data size: 10 MB. URL in base64 format is also supported |

- response parameters:

| Name | Type | Description |
| ---- | ---- | ----------- |
| instrument | string[] | List of instruments used in the song |
| genres | string[] | List of song genres |
| tags | string[] | List of song tags |
| description | string | Overall description of the song |

- request example:

```shell
curl https://api.mureka.ai/v1/song/describe \
  -H "Authorization: Bearer $MUREKA_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://cdn.mureka.ai/1.mp3"
  }'
```

- response example:

```json
{
  "instrument": ["piano", "guitar", "drums"],
  "genres": ["pop", "r&b"],
  "tags": ["emotional", "slow", "passionate"],
  "description": "A slow, emotional R&B ballad featuring piano and guitar with passionate male vocals."
}
```

#### Stem Song

支持模型列表: Mureka Stem Model

1.Task Submission(api_id: song_stem_task_submission)

- url: <https://api.mureka.ai/v1/song/stem>
- type: POST
- request parameters:

| Name | Type | Required | Description | Default Value | Constraints |
| ---- | ---- | -------- | ----------- | ------------- | ----------- |
| url | string | Yes | The URL of the song to be processed | - | Supported formats: mp3, m4a. Max data size: 10 MB. URL in base64 format is also supported |

- response parameters:

| Name | Type | Description |
| ---- | ---- | ----------- |
| zip_url | string | The URL of the ZIP file containing all the split song tracks |
| expires_at | integer | The Unix timestamp (in seconds) for when the url was expired |

- request example:

```shell
curl https://api.mureka.ai/v1/song/stem \
  -H "Authorization: Bearer $MUREKA_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://cdn.mureka.ai/1.mp3"
  }'
```

- response example:

```json
{
  "zip_url": "https://cdn.mureka.ai/stems/song_stems_123.zip",
  "expires_at": 1712630400
}
```

### Vocal

#### Vocal Cloning

支持模型列表: Mureka Vocal Clone Model

1.Task Submission(api_id: vocal_clone_task_submission)

- url: <https://api.mureka.ai/v1/vocal/clone>
- type: POST
- content type: multipart/form-data
- request parameters:

| Name | Type | Required | Description | Default Value | Constraints |
| ---- | ---- | -------- | ----------- | ------------- | ----------- |
| file | binary | Yes | The vocal sample file to upload | - | Supported formats: mp3, m4a. File size must be less than 10 MB |

- response parameters:

| Name | Type | Description |
| ---- | ---- | ----------- |
| id | string | The resource ID |
| filename | string | The uploaded file name, keeping only basename.ext |
| bytes | integer | File size in bytes |
| created_at | integer | The Unix timestamp (in seconds) for when the resource was created |

- request example:

```shell
curl https://api.mureka.ai/v1/vocal/clone \
  -H "Authorization: Bearer $MUREKA_API_KEY" \
  -H "Content-Type: multipart/form-data" \
  -F file="@/path/to/file/refer.m4a"
```

- response example:

```json
{
  "id": "vocal_123456",
  "filename": "refer.m4a",
  "bytes": 2048576,
  "created_at": 1712544000
}
```

### Instrumental

#### Generate Instrumental

支持模型列表: mureka-7.5, mureka-7.6, mureka-8

1.Task Submission(api_id: instrumental_generate_task_submission)

- url: <https://api.mureka.ai/v1/instrumental/generate>
- type: POST
- request parameters:

| Name | Type | Required | Description | Default Value | Constraints |
| ---- | ---- | -------- | ----------- | ------------- | ----------- |
| model | string | No | The model to use | auto | Valid values: auto, mureka-7.5, mureka-7.6, mureka-8 |
| n | integer | No | How many instrumentals to generate for each request | 2 | Maximum 3 |
| prompt | string | No | Control instrumental generation by inputting a prompt | - | Maximum 1024 characters |
| instrumental_id | string | No | Control instrumental generation by referencing music | - | Generated through the files/upload API (for instrumental purpose) |
| stream | boolean | No | Enable streaming phase for playback while generating | false | - |

- response parameters:

| Name | Type | Description |
| ---- | ---- | ----------- |
| id | string | Task ID of the asynchronous instrumental generation task |
| created_at | integer | The Unix timestamp (in seconds) for when the task was created |
| finished_at | integer | The Unix timestamp (in seconds) for when the task was finished |
| model | string | The model used for instrumental generation |
| status | string | The current status of the task: preparing, queued, running, streaming, succeeded, failed, timeouted, cancelled |
| failed_reason | string | The reason for the failure |
| choices | object[] | The generated instrumentals, when the status is succeeded |

- request example:

```shell
curl https://api.mureka.ai/v1/instrumental/generate \
  -H "Authorization: Bearer $MUREKA_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "auto",
    "prompt": "r&b, slow, passionate, male vocal"
  }'
```

- response example:

```json
{
  "id": "instrumental_task_123456",
  "created_at": 1712544000,
  "finished_at": null,
  "model": "mureka-7.6",
  "status": "queued",
  "failed_reason": null,
  "choices": null
}
```

#### Query Instrumental Task

支持模型列表: All Mureka Models

1.Task Query(api_id: instrumental_query_task)

- url: <https://api.mureka.ai/v1/instrumental/query/{task_id}>
- type: GET
- request parameters:

| Name | Type | Required | Description | Default Value | Constraints |
| ---- | ---- | -------- | ----------- | ------------- | ----------- |
| task_id | string | Yes | The task_id of the instrumental generation task | - | - |

- response parameters:

| Name | Type | Description |
| ---- | ---- | ----------- |
| id | string | Task ID of the asynchronous instrumental generation task |
| created_at | integer | The Unix timestamp (in seconds) for when the task was created |
| finished_at | integer | The Unix timestamp (in seconds) for when the task was finished |
| model | string | The model used for instrumental generation |
| status | string | The current status of the task: preparing, queued, running, streaming, succeeded, failed, timeouted, cancelled |
| failed_reason | string | The reason for the failure |
| choices | object[] | The generated instrumentals, when the status is succeeded |

- request example:

```shell
curl https://api.mureka.ai/v1/instrumental/query/435134 \
  -H "Authorization: Bearer $MUREKA_API_KEY"
```

- response example:

```json
{
  "id": "instrumental_task_123456",
  "created_at": 1712544000,
  "finished_at": 1712544300,
  "model": "mureka-7.6",
  "status": "succeeded",
  "failed_reason": null,
  "choices": [
    {
      "id": "instrumental_001",
      "audio_url": "https://cdn.mureka.ai/instrumentals/instrumental_001.mp3",
      "duration": 180
    }
  ]
}
```

### Text to Speech

#### Create Speech

支持模型列表: Mureka TTS Model

1.Task Submission(api_id: tts_generate_task_submission)

- url: <https://api.mureka.ai/v1/tts/generate>
- type: POST
- request parameters:

| Name | Type | Required | Description | Default Value | Constraints |
| ---- | ---- | -------- | ----------- | ------------- | ----------- |
| text | string | Yes | The text to generate audio for | - | Maximum 500 characters |
| voice | string | No | The voice to use when generating the audio | - | Valid values: Ethan, Victoria, Jake, Luna, Emma. Mutually exclusive with voice_id |
| voice_id | string | No | Control audio generation by referencing voice | - | Generated through the files/upload API (for voice purpose). Mutually exclusive with voice |

- response parameters:

| Name | Type | Description |
| ---- | ---- | ----------- |
| url | string | The URL of the audio file |
| expires_at | integer | The Unix timestamp (in seconds) for when the url was expired |

- request example:

```shell
curl https://api.mureka.ai/v1/tts/generate \
  -H "Authorization: Bearer $MUREKA_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Hello, my name is Emma.",
    "voice": "Emma"
  }'
```

- response example:

```json
{
  "url": "https://cdn.mureka.ai/tts/audio_123.mp3",
  "expires_at": 1712630400
}
```

#### Create Podcast

支持模型列表: Mureka TTS Model

1.Task Submission(api_id: tts_podcast_task_submission)

- url: <https://api.mureka.ai/v1/tts/podcast>
- type: POST
- request parameters:

| Name | Type | Required | Description | Default Value | Constraints |
| ---- | ---- | -------- | ----------- | ------------- | ----------- |
| conversations | object[] | Yes | Conversation array | - | Maximum length of the array is 10 |

- conversations fields:

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| text | string | Yes | The text content for this conversation turn |
| voice | string | Yes | The voice to use: Ethan, Victoria, Jake, Luna, Emma |

- response parameters:

| Name | Type | Description |
| ---- | ---- | ----------- |
| url | string | The URL of the audio file |
| expires_at | integer | The Unix timestamp (in seconds) for when the url was expired |

- request example:

```shell
curl https://api.mureka.ai/v1/tts/podcast \
  -H "Authorization: Bearer $MUREKA_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "conversations": [{
      "text": "Hello, my name is Luna.",
      "voice": "Luna"
    },{
      "text": "Hello, my name is Jack.",
      "voice": "Jake"
    },{
      "text": "Prior study has shown that there would exist some variations of patterns and regularities related to instrumentation changes and growing loudness across multi-decadal trends.",
      "voice": "Luna"
    },{
      "text": "The integration of vision and speech in MLLMs is not straightforward due to their inherently.",
      "voice": "Jake"
    }]
  }'
```

- response example:

```json
{
  "url": "https://cdn.mureka.ai/tts/podcast_123.mp3",
  "expires_at": 1712630400
}
```

### Upload

#### Create Upload

支持模型列表: Mureka Upload Model

1.Task Submission(api_id: upload_create_task_submission)

- url: https://api.mureka.ai/v1/uploads/create
- type: POST
- request parameters:

| Name | Type | Required | Description | Default Value | Constraints |
| ---- | ---- | -------- | ----------- | ------------- | ----------- |
| upload_name | string | Yes | Give a name for this upload, or the name of the large file to upload | - | - |
| purpose | string | Yes | The intended purpose of this upload | - | Valid values: fine-tuning |
| bytes | integer | No | The total size of this upload. If not provided, the size will not be checked at the end | - | Format: int64 |

- response parameters:

| Name | Type | Description |
| ---- | ---- | ----------- |
| id | string | Task ID of the asynchronous task |
| upload_name | string | The name of the upload |
| purpose | string | The intended purpose of the upload |
| bytes | integer | The total size of this upload |
| created_at | integer | The Unix timestamp (in seconds) for when the task was created |
| expires_at | integer | The Unix timestamp (in seconds) for when the task was expired |
| status | string | The current status of the task. Valid values: pending, completed, cancelled |
| parts | string[] | The list of parts included in this upload, which only have values when the status is completed |

- request example:

```shell
curl https://api.mureka.ai/v1/uploads/create \
  -H "Authorization: Bearer $MUREKA_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "upload_name": "my.mp3",
    "purpose": "fine-tuning"
  }'
```

- response example:

```json
{
  "id": "upload_123456",
  "upload_name": "my.mp3",
  "purpose": "fine-tuning",
  "bytes": 5242880,
  "created_at": 1712544000,
  "expires_at": 1712630400,
  "status": "pending",
  "parts": null
}
```

#### Add Upload Part

支持模型列表: Mureka Upload Model

1.Task Submission(api_id: upload_add_part_task_submission)

- url: https://api.mureka.ai/v1/uploads/add
- type: POST
- content type: multipart/form-data
- description: Adds a part to an upload object. A part represents a portion of an upload or a chunk of a large file. The maximum size of a part can be up to 10 MB.
- request parameters:

| Name | Type | Required | Description | Default Value | Constraints |
| ---- | ---- | -------- | ----------- | ------------- | ----------- |
| file | binary | Yes | The File object (not file name) to be uploaded | - | Supported format: mp3, m4a. Audio duration: 30-270 seconds. Max size: 10MB |
| upload_id | string | Yes | The ID of the Upload object that this Part was added to | - | - |

- response parameters:

| Name | Type | Description |
| ---- | ---- | ----------- |
| id | string | The upload part ID, which can be referenced in API endpoints |
| upload_id | string | The ID of the Upload object that this Part was added to |
| created_at | integer | The Unix timestamp (in seconds) for when the part was created |

- request example:

```shell
curl https://api.mureka.ai/v1/uploads/add \
  -H "Authorization: Bearer $MUREKA_API_KEY" \
  -F upload_id="1436211" \
  -F file="@mydata.mp3"
```

- response example:

```json
{
  "id": "part_789012",
  "upload_id": "1436211",
  "created_at": 1712544000
}
```

#### Complete Upload

支持模型列表: Mureka Upload Model

1.Task Submission(api_id: upload_complete_task_submission)

- url: https://api.mureka.ai/v1/uploads/complete
- type: POST
- description: Completes the Upload. When creating an upload object with specified bytes, it will check if the sizes of all parts match the specified bytes.
- request parameters:

| Name | Type | Required | Description | Default Value | Constraints |
| ---- | ---- | -------- | ----------- | ------------- | ----------- |
| upload_id | string | Yes | The ID of the Upload object | - | - |
| part_ids | string[] | No | The ordered list of part IDs. If this parameter is empty, it means using all parts added by uploads/add, in the order they were added | - | - |

- response parameters:

| Name | Type | Description |
| ---- | ---- | ----------- |
| id | string | Task ID of the asynchronous task |
| upload_name | string | The name of the upload |
| purpose | string | The intended purpose of the upload |
| bytes | integer | The total size of this upload |
| created_at | integer | The Unix timestamp (in seconds) for when the task was created |
| expires_at | integer | The Unix timestamp (in seconds) for when the task was expired |
| status | string | The current status of the task. Valid values: pending, completed, cancelled |
| parts | string[] | The list of parts included in this upload, which only have values when the status is completed |

- request example:

```shell
curl https://api.mureka.ai/v1/uploads/complete \
  -H "Authorization: Bearer $MUREKA_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "upload_id": "1436211"
  }'
```

- response example:

```json
{
  "id": "upload_1436211",
  "upload_name": "my.mp3",
  "purpose": "fine-tuning",
  "bytes": 5242880,
  "created_at": 1712544000,
  "expires_at": 1712630400,
  "status": "completed",
  "parts": ["part_789012"]
}
```

### Error Code

| Code | Overview | Cause | Solution |
|------|----------|-------|----------|
| 400 | Invalid Request | The request parameters are incorrect. | Refer to the documentation to input the correct request parameters. |
| 401 | Invalid Authentication | Invalid Authentication. | Ensure the correct API key is being used. |
| 403 | Forbidden | You are accessing the API from an unsupported region. | Ensure your access is from a supported region. |
| 429 | Rate limit reached for requests | You are sending requests too quickly. | Pace your requests. Check the concurrent request limit in the pricing plans. |
| 429 | You exceeded your current quota, please check your billing details | You have run out of credits. | Buy more credits. |
| 500 | The server had an error while processing your request | Issue on our servers. | Retry your request after a brief wait and contact us if the issue persists. |
| 503 | The engine is currently overloaded, please try again later | Our servers are experiencing high traffic. | Please retry your requests after a brief wait. |
