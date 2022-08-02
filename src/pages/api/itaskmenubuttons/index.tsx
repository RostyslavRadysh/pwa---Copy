import type { NextApiRequest, NextApiResponse } from 'next'
import { getCookie } from 'cookies-next'
import axios from 'axios'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const baseUrl = `${getCookie('webServiceUrl', { req, res })}/api/itaskmenubuttons`
    
    switch (req.method) {
        case 'GET': {
            const response = await axios.get(baseUrl)
            res.status(response.status).json(response.data)
            break
        }
        default: {
            res.status(400)
        }
    }
}

export default handler
