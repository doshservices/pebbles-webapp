import React, { useMemo, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'

// import { AiFillCamera, AiOutlineCamera } from 'react-icons/ai'

// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

function Dropper(props) {
	const baseStyle = {
		flex: 1,
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		padding: '20px',
		borderWidth: 2,
		borderRadius: 2,
		borderColor: '#eeeeee',
		borderStyle: 'dashed',
		backgroundColor: '#fafafa',
		color: '#bdbdbd',
		outline: 'none',
		transition: 'border .24s ease-in-out',
	}

	const activeStyle = {
		borderColor: '#2196f3',
	}

	const acceptStyle = {
		borderColor: '#00e676',
	}

	const rejectStyle = {
		borderColor: '#ff1744',
	}

	const {
		getRootProps,
		getInputProps,
		// acceptedFiles,
		fileRejections,
		isDragActive,
		isDragAccept,
		isDragReject,
	} = useDropzone({
		accept: props.accept,
		maxFiles: 1,
		onDrop: (acceptedFiles) => {
			//
			acceptedFiles.map((file) => {
				props.setFile(file)
			})
			props.upload()
		},
	})

	const style = useMemo(
		() => ({
			...baseStyle,
			...(isDragActive ? activeStyle : {}),
			...(isDragAccept ? acceptStyle : {}),
			...(isDragReject ? rejectStyle : {}),
		}),
		[isDragActive, isDragReject, isDragAccept]
	)

	// console.log("fileRejections: ", fileRejections)

	useEffect(() => {
		fileRejections.map((rejectedFile) => {
			rejectedFile.errors.map((error) => {
				// toast(error.message)
				console.log('error: ', error.message)
			})
		})
	}, [fileRejections])

	return (
		<div>
			<div className='row'>
				<div className='col-md-5'>
					<div {...getRootProps({ style })}>
						<input {...getInputProps()} />

						{props.caption}
					</div>
				</div>
				<div className='col-md-7'>
					{props.imageArray && props.imageArray.length > 0 ? (
						<div
							style={{ position: 'relative', bottom: '20px' }}
							className='d-flex align-items-center justify-content-end'
						>
							{props.imageArray[0].file.type.includes('image') ? (
								<img
									src={props.imageArray[0].cover}
									alt=''
									style={{
										width: '100%',
										height: '12rem',
										objectFit: 'contain',
										marginTop: '1.5rem',
										top: '',
									}}
								/>
							) : (
								<p> 1 script selected </p>
							)}

							{/* // <AiFillCamera size={15} /> */}
						</div>
					) : null}
				</div>
			</div>
		</div>
	)
}

export default Dropper
