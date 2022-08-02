import type { NextApiRequest, NextApiResponse } from 'next'
import { getCookie } from 'cookies-next'
import axios from 'axios'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const baseUrl = `${getCookie('webServiceUrl', { req, res })}/api/itaskdevices`

    switch (req.method) {
        case 'POST': {
            console.log('b')
            try {
                
            }
            const response = await axios.post(baseUrl, req.body, {
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            console.log('g', response.status)
            res.status(response.status).json(response.data)
            console.log('c')
            break
        }
        case 'GET': {
            const response = await axios.get(baseUrl)
            res.status(response.status).json(response.data)
            break
        }
        case 'PATCH': {
            try {
                console.log('a')
                console.log(req.body)
                req.headers = {
                    'Content-Type': 'application/json',
                }
                const response = await axios.patch(baseUrl, req.body)
                res.status(response.status).json(response.data)
            }
            catch (error: unknown)
            {
               //console.log(error)
            }

            break
        }
        case 'DELETE': {
            const response = await axios.delete(baseUrl, {
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            res.status(response.status).json(response.data)
            break
        }
        default: {
            res.status(400)
        }
    }
}

export default handler
