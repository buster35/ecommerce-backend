const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint
// req.body: {
//  id:
//  tag_name: 
//  }

router.get('/', async (req, res) => {
  try {
  const tagData = await Tag.findAll({
    include: [{ model: Product }],
  });
  res.status(200).json(tagData);
} catch (err) {
  res.status(500).json(err);
}
});

router.get('/:id', async (req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    //if a tag is null based on query parameters then error will be thrown//
    if (!tagData) {
      res.status(404).json({ message: "This tag cannot be found." });
      return;
    }
    //otherwise let browser know successful query, then send back as json//
    else { res.status(200).json(tagData) }
    //any other errors produced will be "caught" and sent back via json//
  } catch (err) {
      res.status(500).json(err)
    }
  });

  router.post('/', async (req, res) => {
    try {
      const tagData = await Tag.create(req.body);
      res.status(200).json(tagData);
    } catch (err) {
      res.status(400).json(err);
    }
  });

  // update a tag's name by its `id` value
  router.put('/:id', async (req, res) => {
    try {
      const tagData = await Tag.update(req.body, {
        where: {
          id: req.params.id
        }
      });
      if (!tagData[0]) {
        res.status(404).json({ message: "No such tag exists." })
        return;
      }
      res.status(200).json({ message: `Successful tag update!` }) //successful tag update
    } catch (err) {
      res.status(500).json(err);
    }
  });

  router.delete('/:id', async (req, res) => {
    // delete a tag by its `id` value
    try {
      const tagData = await Tag.destroy({
        where: {
          id: req.params.id
        }
      })
      if (!tagData) {
        res.status(404).json({ message: "No such tag exists." })
        return;
      }
      res.status(200).json({ message: `Successful tag delete action.`})
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;

// > **Hint**: Be sure to look at the mini-project code for syntax help and use your model's column definitions to figure out what `req.body` will be for POST and PUT routes!
