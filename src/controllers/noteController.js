import Note from "../models/Note.js";

export const getNotes = async (req, res) => {
  const notes = await Note.find({ user: req.user._id });
  res.json(notes);
};

export const getNoteById = async (req, res) => {
  console.log("Fetching note with ID:", req.params.id);
  if (!req.params.id) {
    return res.status(400).json({ message: "Note ID is required" });
  }
  const note = await Note.findOne({ _id: req.params.id, user: req.user._id });
  if (note) res.json(note);
  else res.status(404).json({ message: "Note not found" });
};

export const createNote = async (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).json({ message: "Title and content are required" });
  }
  const note = await Note.create({
    title,
    content,
    user: req.user._id,
  });
  res.status(201).json(note);
};

export const updateNote = async (req, res) => {
const {id} = req.params;
const _id= id;

  const note = await Note.findOne({ _id, user: req.user._id });
 
  if (!note) return res.status(404).json({ message: "Note not found" });

  note.title = req.body.title || note.title;
  note.content = req.body.content || note.content;
  const updated = await note.save();
  res.json(updated);
};

export const deleteNote = async (req, res) => {
  const note = await Note.findOne({ _id: req.params.id, user: req.user._id });
  if (!note) return res.status(404).json({ message: "Note not found" });

  await note.deleteOne();
  res.json({ message: "Note deleted" });
};
