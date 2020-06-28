import React from "react";
import DayPicker, { DateUtils } from "react-day-picker";
import "react-day-picker/lib/style.css";
import { connect } from "react-redux";
import { changeFilters } from "../actionCreator/index";

const months = [
	"Январь",
	"Февраль",
	"Март",
	"Апрель",
	"Май",
	"Июнь",
	"Июль",
	"Август",
	"Сентябрь",
	"Октябрь",
	"Ноябрь",
	"Декабрь"
];

const day = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

class RangeDayPiker extends React.Component {
	static defaultProps = {
		numberOfMonths: 2
	};

	handleDayClick = day => {
		const { changeFilters, range } = this.props;
		changeFilters(DateUtils.addDayToRange(day, range));
	};

	handleReset = () => {
		const { changeFilters } = this.props;
		changeFilters(DateUtils.addDayToRange());
	};

	render() {
		const { from, to } = this.props.range;
		const modifiers = { start: from, end: to };

		return (
			<div className="RangeExample">
				<p> Показать статьи в промежууток </p>
				<p>
					{!from && !to && " От:"}
					{from && !to && "До:"}
					{from &&
						to &&
						`Показаны статьи с ${from.toLocaleDateString()} до
                ${to.toLocaleDateString()}`}{" "}
					{from && to && (
						<button
							className="btn btn-secondary btn-sm ml-3"
							onClick={this.handleReset}
						>
							Сбросить
						</button>
					)}
				</p>
				<DayPicker
					weekdaysShort={day}
					months={months}
					locale="ru"
					className="Selectable"
					numberOfMonths={this.props.numberOfMonths}
					selectedDays={day =>
						DateUtils.isDayInRange(day, { from, to })
					}
					modifiers={modifiers}
					onDayClick={this.handleDayClick}
				/>
			</div>
		);
	}
}

export default connect(
	state => ({
		range: state.filter.dateRange
	}),
	{ changeFilters }
)(RangeDayPiker);
