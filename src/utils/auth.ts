import { GetServerSidePropsContext } from 'next'
import { getCookie } from 'cookies-next'

export const withAuth = async (context: GetServerSidePropsContext) => {
    const baseUrl = `${getCookie('baseUrl', { req: context.req, res: context.res })}`
    const deviceName = `${getCookie('deviceName', { req: context.req, res: context.res })}`
    const deviceId = `${getCookie('deviceId', { req: context.req, res: context.res })}`
    console.log(deviceName)
    if(!baseUrl || !deviceName || !deviceId) {
        return {
            redirect: {
                destination: '/login',
                permanent: false
            }
        }
    }
    return { 
        props: {
            baseUrl,
            deviceName,
            deviceId
        } 
    }
}
