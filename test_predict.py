import json
import pickle
import numpy as np

__data_columns = None
__model = None
__scalar = None


def get_employee_prediction(satisfaction_level, last_evaluation, number_project, average_monthly_hours,
                            time_spend_company, work_accident, promotion_last_5years, salary, dept):
    x = np.zeros(len(__data_columns))
    if 0 <= satisfaction_level <= 1:
        x[0] = satisfaction_level
    else:
        return "Invalid value for satisfaction level"

    if 0 <= last_evaluation <= 1:
        x[1] = last_evaluation
    else:
        return "Invalid value for last_evaluation"

    if isinstance(number_project, int):
        x[2] = number_project
    else:
        return "Invalid value for number_project"

    if isinstance(average_monthly_hours, int):
        x[3] = average_monthly_hours
    else:
        return "Invalid value for average_monthly_hours"

    if isinstance(time_spend_company, int):
        x[4] = time_spend_company
    else:
        return "Invalid value for time_spend_company"

    if work_accident.lower() == "yes":
        x[5] = 1
    elif work_accident.lower() == "no":
        x[5] = 0
    else:
        return "Invalid value for work accident"

    if promotion_last_5years.lower() == "yes":
        x[6] = 1
    elif promotion_last_5years.lower() == "no":
        x[6] = 0
    else:
        return "Invalid value for promotion_last_5years"

    if salary.lower() == "high":
        x[7] = 2
    elif salary.lower() == "med":
        x[7] = 1
    elif salary.lower() == "low":
        x[7] = 0
    else:
        return "Invalid value for salary"

    dept_list = ["it", "randd", "accounting", "hr", "management", "marketing", "product_mng", "sales", "support",
                 "technical"]
    if dept in dept_list:
        x[8 + dept_list.index(dept)] = 1
    else:
        return "Invalid value for departments"

    x = __scalar.transform([x])
    return "Employee will leave" if __model.predict(x)[0] else "Employee will stay"


def load_saved_artifacts():
    print("Loading saved artifacts....")
    global __data_columns
    global __model
    global __scalar

    with open("./artifacts/Employee_attrition_columns_copy.json", 'r') as f:
        __data_columns = json.load(f)["data_columns"]

    with open("./artifacts/Employee_attrition_scaler.pickle", "rb") as f:
        __scalar = pickle.load(f)

    with open("./artifacts/Employee_attrition_model.pickle", "rb") as f:
        __model = pickle.load(f)

    print("Saved Artifacts loaded")


if __name__ == '__main__':
    load_saved_artifacts()

    # Enter Values Here to get predictions
    print(get_employee_prediction(0.40, 0.57, 2, 151, 3, "no", "no", "low", "support"))
