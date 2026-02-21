import type { ConditionModel } from "./condition";
import type { LocationModel } from "./location";
import type { PhotoModel } from "./photo";
import type { SpaceModel } from "./space";
import type { TextModel } from "./text";
import type { VideoModel } from "./video";

export interface MediaResponse {
  id: number;
  title: string;
  description: string;
  mediaStatus: string;
  mediaType: string;
  spaceModel: SpaceModel;
  locationModel: LocationModel;
  conditionModel: ConditionModel;
  videoModels: VideoModel[];
  photoModels: PhotoModel[];
  textModel: TextModel;
}
