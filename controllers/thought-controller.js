const { Thought, User } = require('../models');

module.exports = {

    //get all thought 
    getThoughts(req, res) {
        Thought.find()
            .then((thought) => res.json(thought))
            .catch((err) => res.status(500).json(err));
    },
    //
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought with that ID' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },

    // create a thought
    createThought(req, res) {
        Thought.create(req.body)
            .then((dbThoughtData) => {
                return User.findOneAndUpdate(
                    { _id: req.body.userId },
                    { $push: { thoughts: dbThoughtData._id } },
                    { new: true }
                );
            })
            .then((dbUserData) => {
                if (!dbUserData) {
                    return res.status(404).json({ message: 'Thought was created but no user with this id' });
                }
                res.json({ message: 'Thought was successfully created' });
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },


    // update a thought
    updateThought(req, res) {
    Thought.findOneAndUpdate(
        { _id: req.body.userId },
        { $set: req.body },
        { new: true }
    )
        .then((dbThoughtData) =>
            !dbThoughtData
                ? res.status(404).json({ message: 'No thought with this id' })
                : res.json(dbThoughtData)
        )
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
},

//delete a thought
deleteThought(req, res) {
    Thought.findOneAndRemove({ _id: req.params.thoughtId })
        .then((thought) =>
            !thought
                ? res.status(404).json({ message: 'No thought with this id!' })
                : User.findOneAndUpdate(
                    { thoughts: req.params.thoughtId },
                    { $pull: { thoughts: req.params.thoughtId } },
                    { new: true }
                )
        )
        .then((user) =>
            !user
                ? res.status(404).json({
                    message: 'Thought created but no user with this id!',
                })
                : res.json({ message: 'Thought successfully deleted!' })
        )
        .catch((err) => res.status(500).json(err));
},



addReaction(req, res) {
    Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { new: true }
    )
        .then((thought) =>
            !thought
                ? res.status(404).json({ message: 'No thought with this id!' })
                : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
},
removeReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with this id!' })
          : Thought.deleteMany({ _id: { $in: thought.reactions } })
      )
      .then(() => res.json({ message: 'Thought and  associated reactions deleted!' }))
      .catch((err) => res.status(500).json(err));
  },
};
