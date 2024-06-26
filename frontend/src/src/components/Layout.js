import Head from 'next/head'
import Navigation from './Navigation'

function Layout(props){
    return (
        <>
            <Head>
                <meta name='viewport' content='width=device-width, initial-scale=1' />
            </Head>
            <Navigation />
            <div className='max-w-7xl mx-auto px-8 py-6'>{props.children}</div>
        </>
    )
}

export default Layout