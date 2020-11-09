import { Element } from "react"
import Modal from "@material-ui/core/Modal"
import styled from "styled-components"
import CloseIcon from "@material-ui/icons/Close"

const StyledModal = styled(Modal)`
		display: flex;
		align-items: center;
		justify-content: center;
`

const StyledIcon = styled(CloseIcon)`
	color: gray;
	cursor: pointer;
`

const ModalWrapper = styled.div`
	padding-top: 0.5em;
	padding-right: 0.5em;
`

const ModalContentWRapper = styled.div`
	display:flex;
	flex-direction: column;
	background-color: #ffffff;
	border-radius: 15px 15px;
`

const IconWrapper = styled.div`
	padding-top: 0.5em;
	padding-right: 0.5em;
`

const MainModal = ({ children }) => {
	return (
		<ModalWrapper>
			<StyledModal
				open
			>
				<ModalContentWRapper>
					<IconWrapper>
						<StyledIcon/>
					</IconWrapper>
					{children}
				</ModalContentWRapper>
			</StyledModal>
		</ModalWrapper>
	)
}

MainModal.propTypes = {
	children: Element
}

export default MainModal