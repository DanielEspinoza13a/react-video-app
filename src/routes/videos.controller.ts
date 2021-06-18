import { RequestHandler } from "express";
import video from "./video";

export const createVideo: RequestHandler = async (req, res) => {
  try {
    const videoFound = await video.findOne({ url: req.body.url });

    if (videoFound) {
      return res.status(301).json({ msg: "the url already exist" });
    }

    const Cvideo = new video(req.body);

    const savedVideo = await Cvideo.save();

    return res.status(200).json(savedVideo);
  } catch (error) {
    return res.status(500).json({ msg: "internal server error" });
  }
};

export const getVideos: RequestHandler = async (req, res) => {
  try {
    const Gvideos = await video.find();

    return res.status(200).json(Gvideos);
  } catch (error) {
    return res.status(500).json({ msg: "internal server error" });
  }
};

export const getVideo: RequestHandler = async (req, res) => {
  try {
    const Gvideo = await video.findById(req.params.id);

    if (!Gvideo) {
      return res.status(500).json({ msg: "not video found" });
    }

    return res.status(200).json(Gvideo);
  } catch (error) {
    return res.status(500).json({ msg: "internal server error" });
  }
};

export const updateVideo: RequestHandler = async (req, res) => {
  try {
    const Uvideo = await video.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!Uvideo) {
      return res.status(500).json({ msg: "not video found" });
    }

    return res.status(200).json({ Uvideo, msg: "video updated" });
  } catch (error) {
    return res.status(500).json({ msg: "internal server error" });
  }
};

export const deleteVideo: RequestHandler = async (req, res) => {
  try {
    const Dvideo = await video.findByIdAndDelete(req.params.id);

    if (!Dvideo) {
      return res.status(500).json({ msg: "not video found" });
    }

    return res.status(200).json({ Dvideo, msg: "video deleted" });
  } catch (error) {
    return res.status(500).json({ msg: "internal server error" });
  }
};
