import { GetServerSidePropsContext } from 'next'
import { getCookie } from 'cookies-next'

export const withAuth = async (context: GetServerSidePropsContext) => {
    const baseUrl = getCookie('baseUrl', { req: context.req, res: context.res })
    const key = getCookie('key', { req: context.req, res: context.res })
    if(!baseUrl && !key) {
        return {
            redirect: {
                destination: '/login',
                permanent: false
            }
        }
    }

    return { 
        props: { } 
    }
}
