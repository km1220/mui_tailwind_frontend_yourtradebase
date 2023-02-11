import React from 'react'

export default function Material() {
	return (
		<Box className={clsx(classes.addBox, 'flex flex-col')}>
			<div className='mb-2'>
				<Typography variant='subtitle2'>Code (optional)</Typography>
				<ItemComponent className="mr-6">
					<input placeholder='Product code' />
				</ItemComponent>
			</div>
			<div className='mb-2'>
				<Typography variant='subtitle2'>Title</Typography>
				<ItemComponent className="w-full">
					<input placeholder='Enter a title for this material' />
				</ItemComponent>
			</div>
			<div className={clsx(classes.inputsContainer, 'mb-2')}>
				<div>
					<Typography variant='subtitle2'>Price</Typography>
					<ItemComponent className="">
						<input defaultValue={0} />
					</ItemComponent>
				</div>
				<div>
					<Typography variant='subtitle2'>for each (optional)</Typography>
					<ItemComponent className="">
						<input placeholder='' />
					</ItemComponent>
				</div>
				<div>
					<Typography variant='subtitle2'>Markup (optional)</Typography>
					<ItemComponent className="">
						<input defaultValue={0} />
					</ItemComponent>
				</div>
			</div>
			<div className='mb-2'>
				<Typography variant='subtitle2'>Category (optional)</Typography>
				<ItemComponent className="w-full">
					category
				</ItemComponent>
			</div>
			<div className='mb-2'>
				<Typography variant='subtitle2'>Brand (optional)</Typography>
				<ItemComponent className="w-full">
					Brand Info
				</ItemComponent>
			</div>
			<div className='flex justify-center'>
				<Button className='mx-4 rounded' color="secondary" variant="contained">Save material</Button>
				<Button className='mx-4 rounded' color="inherit" variant="outlined" onClick={() => setShowAddBox(false)}>Discard</Button>
			</div>
		</Box>
	)
}
