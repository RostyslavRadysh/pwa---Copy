import { GetServerSidePropsContext } from 'next'
import { getCookie } from 'cookies-next'

export const withAuth = async (context: GetServerSidePropsContext) => {
    const baseUrl = `${getCookie('baseUrl', { req: context.req, res: context.res })}`
    const name = `${getCookie('name', { req: context.req, res: context.res })}`
    const id = `${getCookie('id', { req: context.req, res: context.res })}`
    console.log(id)
    if(!baseUrl || !name || !id) {
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
            name,
            id
        } 
    }
}
