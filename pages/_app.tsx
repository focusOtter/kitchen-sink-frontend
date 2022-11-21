import type { AppProps } from 'next/app'
import { AmplifyProvider } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css'
import { Amplify } from 'aws-amplify'

Amplify.configure({
	aws_project_region: 'us-east-1',
	Auth: {
		region: 'us-east-1',
		userPoolId: 'us-east-1_KcRwIEqwx',
		userPoolWebClientId: '2becm8seaiol1gdr3uvr4i8bue',
		identityPoolId: 'us-east-1:ca5a162a-8e93-4847-9864-1f1fef1c7d9b',
	},
	Storage: {
		AWSS3: {
			bucket: 'productfilestoragestack-productbucket674e806c-vu5bd2brtrhy',
			region: 'us-east-1',
		},
	},
	aws_appsync_graphqlEndpoint:
		'https://ulgcri74prestbdtt72nm3wpeq.appsync-api.us-east-1.amazonaws.com/graphql',
	aws_appsync_region: 'us-east-1',
	aws_appsync_authenticationType: 'AMAZON_COGNITO_USER_POOLS',
})

export default function App({ Component, pageProps }: AppProps) {
	return (
		<AmplifyProvider>
			<Component {...pageProps} />
		</AmplifyProvider>
	)
}
