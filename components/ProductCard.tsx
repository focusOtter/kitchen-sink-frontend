import { Card, Flex, Image, Text, View } from '@aws-amplify/ui-react'

interface ProductCardProps {
	product: {
		id: string
		name: string
		description: string
		price: number
		imgURL: string
		key?: string
	}
}

function ProductCard({ product }: ProductCardProps) {
	console.log('the product', product)
	const { description, id, imgURL, name, price } = product
	return (
		<Flex wrap={'wrap'}>
			<Card key={id} variation="elevated">
				<Flex direction={'column'}>
					<View>
						<Image src={imgURL} alt={name} />
					</View>
					<Flex justifyContent={'space-between'}>
						<Text>{name}</Text>
						<Text>
							{Intl.NumberFormat('en-US', {
								style: 'currency',
								currency: 'USD',
							}).format(price / 100)}
						</Text>
					</Flex>
					<Text>{description}</Text>
				</Flex>
			</Card>
		</Flex>
	)
}

export default ProductCard
