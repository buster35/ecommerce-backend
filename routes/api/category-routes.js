const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint; this is where we'll receive req to database and send correct data back, respectively//

router.get('/', async (req, res) => {
  try {
  // find all categories by generating a SELECT query to db; also, including Product in results//
  const categoryData = await Category.findAll()({
    include: [{ model: Product }],
  });
  res.status(200).json(categoryData);
} catch (err) {
  res.status(500).json(err);
}
});

router.get('/:id', async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    //if a category is null based on query parameters then error will be thrown//
    if (!categoryData) {
      res.status(404).json({ message: "This category cannot be found." });
      return;
    }
    //otherwise let browser know successful query, then send back as json//
    else { res.status(200).json(categoryData) }
    //any other errors produced will be "caught" and sent back via json//
  } catch (err) {
      res.status(500).json(err)
    }
  });

//route endpoint with data sent to create a new category
router.post('/', async (req, res) => {
  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const categoryData = await Category.update(req.body, {
      where: {
        id: req.params.id
      }
    });
    if (!categoryData[0]) {
      res.status(404).json({ message: "No such category exists." })
      return;
    }
    res.status(200).json({ message: `Successful update for the ${req.body} category!` }) //successful category update
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryData = await Category.destroy(req.body, {
      where: {
        id: req.params.id
      }
    })
    if (!categoryData[0]) {
      res.status(404).json({ message: "No such category exists." })
      return;
    }
    res.status(200).json({ message: `Successful delete action on the ${req.body} category.`})
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

//Fill out the unfinished routes in `product-routes.js`, `tag-routes.js`, and `category-routes.js` to perform create, read, update, and delete operations using your Sequelize models.

// > **Hint**: Be sure to look at the mini-project code for syntax help and use your model's column definitions to figure out what `req.body` will be for POST and PUT routes!
