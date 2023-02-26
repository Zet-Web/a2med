export async function getServerSideProps() {
  return {
    redirect: {
      destination: '/auth/login',
      permanent: false,
    },
  }
}

const AuthRedirect = () => <></>

export default AuthRedirect
