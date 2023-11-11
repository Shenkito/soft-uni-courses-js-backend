const router = require('express').Router();

const electronicManager = require('../managers/electronicManager');
const { getErrorMessage } = require('../utils/errorHelpers');
const { isAuth } = require('../middlewares/authMiddleware');


router.get('/', async (req, res) => {
    const electronics = await electronicManager.getAll().lean();
    res.render('electronics/catalog', { electronics });
});

router.get('/create', isAuth, (req, res) => {
    res.render('electronics/create');
});

router.post('/create', isAuth, async (req, res) => {

    const electronicData = {
        ...req.body,
        owner: req.user._id,
    };

    try {
        await electronicManager.create(electronicData);

        res.redirect('/electronics');
    } catch (err) {
        res.render('electronics/create', { error: getErrorMessage(err) });
    }
});

router.get('/:electronicId/details', async (req, res) => {
    const electronicId = req.params.electronicId;
    const electronic = await electronicManager.getOne(electronicId).lean();
    const isOwner = req.user?._id == electronic.owner._id;

    res.render('electronics/details', { electronic, isOwner, isNotOwnerAndBought, isAuthenticated });
});

router.get('/:electronicId/delete', isAuth, async (req, res) => {
    const electronicId = req.params.electronicId;

    try {
        await electronicManager.delete(req.params.electronicId);

        res.redirect('/electronics');
    } catch (err) {
        res.render('electronics/details', { error: 'Unsuccessful photo deletion' })
    }
});

router.get('/:electronicId/edit', isAuth, async (req, res) => {

    const electronic = await electronicManager.getOne(req.params.electronicId).lean();

    res.render('electronics/edit', { electronic });
});

router.post('/:electronicId/edit', isAuth, async (req, res) => {

    const electronicId = req.params.electronicId;
    const electronicData = req.body

    try {
        await electronicManager.edit(electronicId, electronicData);
        res.redirect(`/electronics/${electronicId}/details`)
    } catch (err) {
        res.render('electronics/edit', { error: 'Unable to update photo', ...electronicData });
    }
});

router.post('/:electronicId/buy', isAuth, async (req, res) => {
    try {
        const electronicId = req.params.electronicId;
        const userId = req.user._id;

        // Check if the user has already bought the electronic item
        const electronic = await electronicManager.getOne(electronicId);

        if (!electronic) {
            return res.status(404).json({ error: 'Electronic item not found' });
        }

        if (electronic.owner.toString() === userId) {
            return res.status(403).json({ error: 'You cannot buy your own electronic item' });
        }

        // Check if the user has already bought the item
        if (electronic.buyingList.some(buyer => buyer.user.toString() === userId)) {
            return res.status(400).json({ error: 'You have already bought this item' });
        }

        // Add the user to the list of buyers (buyingList) of the electronic item
        electronic.buyingList.push({ user: userId });

        // Save the updated electronic item
        await electronic.save();

        res.status(200).json({ message: 'Item purchased successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to purchase the item' });
    }
});


module.exports = router;