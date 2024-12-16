import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Spinner from "../../ui/Spinner";
import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "./userBooking";
import {
  HiArrowDownOnSquare,
  HiArrowUpOnSquare,
  HiTrash,
} from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { useCheckOut } from "../check-in-out/useCheckOut";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { useDeleteBooking } from "./useDeleteBooking";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const { isLoading, booking } = useBooking();
  const { checkout, isCheckinOut } = useCheckOut();
  const { deleteBookin, isDeleting } = useDeleteBooking();
  const navigate = useNavigate();
  const moveBack = useMoveBack();
  if (isLoading || isDeleting) return <Spinner />;
  const { status, id } = booking;
  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{id}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />
      <Modal>
        <ButtonGroup>
          <Button variation="secondary" onClick={moveBack}>
            Back
          </Button>
          {status === "unconfirmed" && (
            <Button
              icon={<HiArrowDownOnSquare />}
              onClick={() => navigate(`/checkin/${id}`)}
            >
              Checkin
            </Button>
          )}
          {status === "checked-in" && (
            <Button
              icon={<HiArrowUpOnSquare />}
              onClick={() => {
                checkout(id);
              }}
              disabled={isCheckinOut}
            >
              Check-out
            </Button>
          )}

          <Modal.Open opens={"delete"}>
            <Button icon={<HiTrash />} variations="danger">
              delete
            </Button>
          </Modal.Open>

          <Modal.Window name={"delete"}>
            <ConfirmDelete
              resourceName="booking"
              onConfirm={() =>
                deleteBookin(id, {
                  onSettled: () => navigate(-1),
                })
              }
              disabled={isDeleting}
            />
          </Modal.Window>
        </ButtonGroup>
      </Modal>
    </>
  );
}

export default BookingDetail;
