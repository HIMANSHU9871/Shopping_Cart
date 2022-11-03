//sk_test_51M02gZSEDOoyXGO8BtnKtBp4Q2uBAcsRuED7fIhHzQAVG4kyRJhf7lTdou2UeJKnRDdl2LMyXoDNKynCmed6oKKq00Ll9RiSnc
//Coffee: price_1M0338SEDOoyXGO8TPzC6TAE
// Sunglasses : price_1M0359SEDOoyXGO8CeZwEZtT
// Camera : price_1M036MSEDOoyXGO8Beb758SJ

const express= require ( 'express' );
var cors = require ('cors');
const stripe = require('stripe')('sk_test_51M02gZSEDOoyXGO8BtnKtBp4Q2uBAcsRuED7fIhHzQAVG4kyRJhf7lTdou2UeJKnRDdl2LMyXoDNKynCmed6oKKq00Ll9RiSnc')

const app = express();
app.use(cors());
app.use(express.static("public"));
app.use(express.json());

app.post("/checkout", async (req, res) => {
    /*
    req.body.items
    [
        {
            id: 1,
            quantity: 3
        }
    ]
    stripe wants
    [
        {
            price: 1,
            quantity: 3
        }
    ]
    */
    console.log(req.body);
    const items = req.body.items;
    let lineItems = [];
    items.forEach((item)=> {
        lineItems.push(
            {
                price: item.id,
                quantity: item.quantity
            }
        )
    });

    const session = await stripe.checkout.sessions.create({
        line_items: lineItems,
        mode: 'payment',
        success_url: "http://localhost:3000/success",
        cancel_url: "http://localhost:3000/cancel"
    });

    res.send(JSON.stringify({
        url: session.url
    }));
});

app.listen(4000, () => console.log("Listening on port 4000!"));