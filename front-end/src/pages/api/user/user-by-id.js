import { API_URL,API_METHODS } from "@/assets/api-endpoints";
import { backendAxiosInstance } from "@/assets/backend-axios-instance";

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '1024mb' // Set desired value here
        }
    }
}
export default async function handler(req, res) {
  if (req.method === API_METHODS.GET) {
        try {
            if (!req.headers?.authorization){
                res.status(401).send('Unauthorized');
            }
            const config = {
                headers: {
                    'Authorization': req.headers.authorization,
                }
            };
            const body = req.query;

            console.log("USERR BY ID", body)

            await backendAxiosInstance.get(`${API_URL.FETCH_USER_BY_ID}/${body.user_id}`, config).then(response => {
                res.status(200).json(response.data);

            }).catch(e => {
                    res.status(e.response?.status ?? 500).json(e.response?.data)
                }
            )

        } catch (e) {
            res.status(500).json(e.message);
        }
    }
    else if (req.method === API_METHODS.PUT) {
        try {
            if (!req.headers?.authorization){
                res.status(401).send('Unauthorized');
            }
            const config = {
                headers: {
                    'Authorization': req.headers.authorization,
                }
            };
            const body = req.body;

            console.log("USERR BY ID_URL ",`${API_URL.FETCH_USER_BY_ID}/${body.body.id}`)

            await backendAxiosInstance.put(`${API_URL.FETCH_USER_BY_ID}/${body.body.id}/`,body.body, config).then(response => {
                res.status(200).json(response.data);

            }).catch(e => {
                    res.status(e.response?.status ?? 500).json(e.response?.data)

                }
            )

        } catch (e) {
            res.status(500).json(e.message);
        }
    }
    else if (req.method === API_METHODS.DELETE) {
        try {
            if (!req.headers?.authorization){
                res.status(401).send('Unauthorized');
            }
            const config = {
                headers: {
                    'Authorization': req.headers.authorization,
                }
            };
            const data = req.query;

            console.log("DELETE USERR BY ID_URL ",`${API_URL.FETCH_USER_BY_ID}/${data.user_id}`)

            await backendAxiosInstance.delete(`${API_URL.FETCH_USER_BY_ID}/${data.user_id}/`, config).then(response => {
                res.status(200).json(response.data);

            }).catch(e => {
                    res.status(e.response?.status ?? 500).json(e.response?.data)

                }
            )

        } catch (e) {
            res.status(500).json(e.message);
        }
    }
    else {
        res.status(404).json({message: 'path not found!'});
    }
}