import { utilService } from "../services/util.service.js"

export function ReviewPreview({ review}) {
    const { fullName, rate, date } = review
    return (
        <React.Fragment>
                <li>{fullName}</li>
                <li>{utilService.getStars(rate)}</li>
                <li>{date}</li>
        </React.Fragment>
    )
}
