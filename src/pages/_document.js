import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head />
        <body className='h-[100vh]'>
          <Main className="next2" dd="dd"/>
          <NextScript className="next" cc="cc" />
        </body>
      </Html>
    )
  }
}

export default MyDocument