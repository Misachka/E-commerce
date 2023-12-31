const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data

 try {
  const allTags = await Tag.findAll({
    include: [{ model: Product, through: ProductTag }],
  });

  res.json(allTags);

 } catch (error) {
  res.status(500).json(error);
 }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data

  try {
    const oneTag = await Tag.findByPk(req.params.id, {
    include: [{ model: Product, through: ProductTag}],
    });

    if (!oneTag) {
      res.status(404).json({ message: 'No tag found with this id'});
      return;

    }
    res.status(200).json(oneTag);

  } catch (error) {
    res.status(500).json(error);
  
  }
});

router.post('/', async (req, res) => {
  // create a new tag

  try {
    const newTag = await Tag.create(req.body);
    res.status(200).json(newTag);

  }catch (error) {
    res.status(400).json(error);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value

  try {
    const putTag = await Tag.update(req.body, {
      where: {
        id: req.params.id
      },
    });

    if (!putTag){
      res.status(404).json({ message: 'No tag found'});
      return;
    }

    res.status(200).json(putTag);

  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value

  try {
    const delTag = await Tag.destroy({
      where: {
        id: req.params.id
      },
    });

    if (!delTag){
      res.status(404).json({ message: 'no tag id found'});
      return;
    }

    res.status(200).json(delTag);

  } catch (error) {
    res.status(500).json(error);
  }
  
});

module.exports = router;
