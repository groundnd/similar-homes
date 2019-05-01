module.exports.path = 'ABSOLUTE_PATH_TO_FILE';

  COPY "SDC"."Homes" ("id","city","createdAt","locationName","photoUrl","price","propertyAvail","rating","reviewCount","updatedAt") FROM '/Users/Wicha/Documents/Hack_Reactor/SDC/similar-homes/server/db/utils/dbSEED.txt' WITH DELIMITER=',' AND HEADER=FALSE;

"city","createdAt","locationName","photoUrl","price","propertyAvail","rating","reviewCount","updatedAt"