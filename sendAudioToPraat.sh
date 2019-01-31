sudo chmod 777 uploads/$1
cp praat/getPitchTier.Praat uploads/$1/getPitchTier.Praat
cd uploads/$1
praat getPitchTier.Praat
echo "$(tmp.csv)"
