import { Suspense } from 'react'
import ResetPassword from './ResetPage/page'
import Loading from '../loading'

export default function ResetPasswordWithSuspense() {
  return (
    <Suspense fallback={<Loading />}>
      <ResetPassword />
    </Suspense>
  );
}

/*it's recommended to wrap the component that uses useSearchParams()
 in a Suspense boundary, even though the ResetPassword page is statically rendered. 
 This is because the component is still fetching data based on the token search parameter, 
 which is considered a dynamic operation. */