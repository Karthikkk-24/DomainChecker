// server.js
import axios from 'axios';
import cors from 'cors';
import express from 'express';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.post('/check-domain', async (req, res) => {
    const { domain } = req.body;
    const apiKey = 'ENTER_YOUR_API_KEY_HERE';

    try {
        const response = await axios.get(
            `https://api.api-ninjas.com/v1/whois?domain=${domain}`,
            {
                headers: {
                    'X-Api-Key': apiKey,
                },
            }
        );

        res.json(response.data);
    } catch (error) {
        console.error(
            'Error:',
            error.response ? error.response.data : error.message
        );
        res.status(500).json({
            error: 'An error occurred while checking the domain',
        });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
