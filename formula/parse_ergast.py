import argparse
import csv
import os

import json

RACES_FILE_NAME = "races.csv"
DRIVERS_FILE_NAME = "drivers.csv"
CONSTRUCTORS_FILE_NAME = "constructors.csv"
RESULTS_FILE_NAME = "results.csv"
CONSTRUCTOR_STANDINGS_FILE_NAME = "constructor_standings.csv"
DRIVER_STANDINGS_FILE_NAME = "driver_standings.csv"

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


def organize_results(
    results_file_path, races, constructor_standings_by_year, driver_standings_by_year
):
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
                if year in constructor_standings_by_year:
                    constructor_standing = constructor_standings_by_year[year].get(
                        constructor_id, dict()
                    )
                    constructor_points = constructor_standing.get("points", 0)
                    constructor_position = constructor_standing.get("position", 0)
                else:
                    constructor_points = None
                    constructor_position = None

                results_by_year[year][constructor_id] = dict(
                    points=constructor_points,
                    position=constructor_position,
                    drivers=dict(),
                )

            if driver_id not in results_by_year[year][constructor_id]["drivers"]:
                driver_standing = driver_standings_by_year[year].get(driver_id, dict())
                driver_points = driver_standing.get("points", 0)
                driver_position = driver_standing.get("position", 0)

                results_by_year[year][constructor_id]["drivers"][driver_id] = dict(
                    points=driver_points,
                    position=driver_position,
                )

    return results_by_year


def organize_standings(standings, key, races, last_races):
    points_by_year = dict()

    for standing_id, standing in standings.items():
        race = races[standing["raceId"]]
        year = race["year"]

        if last_races[year] != standing["raceId"]:
            continue

        if year not in points_by_year:
            points_by_year[year] = dict()

        points_by_year[year][standing[key]] = dict(
            points=float(standing["points"]), position=int(standing["position"])
        )

    return points_by_year


def find_last_races(races):
    last_races_by_year = dict()
    max_round_by_year = dict()

    for race_id, race in races.items():
        year = race["year"]

        current_round = int(race["round"])
        previous_max_round = max_round_by_year.get(year, 0)
        if current_round > previous_max_round:
            max_round_by_year[year] = current_round
            last_races_by_year[year] = race_id

    return last_races_by_year


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("db_folder")
    ap.add_argument("output_file_name")
    args = ap.parse_args()

    constructors_file_path = os.path.join(args.db_folder, CONSTRUCTORS_FILE_NAME)
    constructors = key_csv(
        constructors_file_path, "constructorId", fields=CONSTRUCTOR_FIELDS
    )

    constructor_standings_file_path = os.path.join(
        args.db_folder, CONSTRUCTOR_STANDINGS_FILE_NAME
    )
    constructor_standings = key_csv(
        constructor_standings_file_path, "constructorStandingsId"
    )

    drivers_file_path = os.path.join(args.db_folder, DRIVERS_FILE_NAME)
    drivers = key_csv(drivers_file_path, "driverId", fields=DRIVER_FIELDS)

    driver_standings_file_path = os.path.join(
        args.db_folder, DRIVER_STANDINGS_FILE_NAME
    )
    driver_standings = key_csv(driver_standings_file_path, "driverStandingsId")

    races_file_path = os.path.join(args.db_folder, RACES_FILE_NAME)
    races = key_csv(races_file_path, "raceId")

    last_races = find_last_races(races)

    constructor_points_by_year = organize_standings(
        constructor_standings, "constructorId", races, last_races
    )
    driver_points_by_year = organize_standings(
        driver_standings, "driverId", races, last_races
    )

    results_file_path = os.path.join(args.db_folder, RESULTS_FILE_NAME)
    pairings = organize_results(
        results_file_path, races, constructor_points_by_year, driver_points_by_year,
    )

    with open(args.output_file_name, "w+") as output_file:
        json.dump(
            dict(constructors=constructors, drivers=drivers, pairings=pairings,),
            output_file,
            sort_keys=True,
            cls=ExtendedEncoder,
        )


if __name__ == "__main__":
    main()
