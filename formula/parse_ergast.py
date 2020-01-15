import argparse
import csv
import os

import json

RACES_FILE_NAME = "races.csv"
DRIVERS_FILE_NAME = "drivers.csv"
CONSTRUCTORS_FILE_NAME = "constructors.csv"
RESULTS_FILE_NAME = "results.csv"

DRIVER_FIELDS = ["driverId", "forename", "surname", "nationality", "url"]
CONSTRUCTOR_FIELDS = ["constructorId", "name", "nationality", "url"]


class ExtendedEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, set):
            return list(obj)

        return json.JSONEncoder.default(self, obj)


def key_csv(file_path, key, fields=None):
    rows = dict()
    with open(file_path) as csv_file:
        reader = csv.DictReader(csv_file)

        for row in reader:
            row_id = row[key]
            if fields:
                rows[row_id] = {field: row[field] for field in fields}
            else:
                rows[row_id] = row

    return rows


def organize_results(results_file_path, races):
    results_by_year = dict()

    with open(results_file_path) as results_file:
        reader = csv.DictReader(results_file)

        for row in reader:
            race_id = row["raceId"]
            constructor_id = row["constructorId"]
            driver_id = row["driverId"]

            race = races[race_id]
            year = race["year"]

            if year not in results_by_year:
                results_by_year[year] = dict()

            if constructor_id not in results_by_year[year]:
                results_by_year[year][constructor_id] = set()

            results_by_year[year][constructor_id].add(driver_id)

    return results_by_year


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("db_folder")
    ap.add_argument("output_file_name")
    args = ap.parse_args()

    constructors_file_path = os.path.join(args.db_folder, CONSTRUCTORS_FILE_NAME)
    constructors = key_csv(constructors_file_path, "constructorId", fields=CONSTRUCTOR_FIELDS)

    drivers_file_path = os.path.join(args.db_folder, DRIVERS_FILE_NAME)
    drivers = key_csv(drivers_file_path, "driverId", fields=DRIVER_FIELDS)

    races_file_path = os.path.join(args.db_folder, RACES_FILE_NAME)
    races = key_csv(races_file_path, "raceId")

    results_file_path = os.path.join(args.db_folder, RESULTS_FILE_NAME)
    pairings = organize_results(results_file_path, races)

    with open(args.output_file_name, "w+") as output_file:
        json.dump(
            dict(constructors=constructors, drivers=drivers, pairings=pairings,),
            output_file,
            sort_keys=True,
            cls=ExtendedEncoder,
        )


if __name__ == "__main__":
    main()
