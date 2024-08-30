import Bool "mo:base/Bool";
import Hash "mo:base/Hash";

import HashMap "mo:base/HashMap";
import Text "mo:base/Text";
import Iter "mo:base/Iter";
import Array "mo:base/Array";
import Option "mo:base/Option";

actor {
  // Define the TaxPayer type
  public type TaxPayer = {
    tid: Text;
    firstName: Text;
    lastName: Text;
    address: Text;
  };

  // Create a stable variable to store TaxPayer records
  private stable var taxPayersEntries : [(Text, TaxPayer)] = [];

  // Create a HashMap to store TaxPayer records
  private var taxPayers = HashMap.HashMap<Text, TaxPayer>(0, Text.equal, Text.hash);

  // Initialize the HashMap with stable data
  system func preupgrade() {
    taxPayersEntries := Iter.toArray(taxPayers.entries());
  };

  system func postupgrade() {
    taxPayers := HashMap.fromIter<Text, TaxPayer>(taxPayersEntries.vals(), 0, Text.equal, Text.hash);
    taxPayersEntries := [];
  };

  // Create a new TaxPayer record
  public func createTaxPayer(tid: Text, firstName: Text, lastName: Text, address: Text) : async () {
    let newTaxPayer : TaxPayer = {
      tid = tid;
      firstName = firstName;
      lastName = lastName;
      address = address;
    };
    taxPayers.put(tid, newTaxPayer);
  };

  // Get all TaxPayer records
  public query func getAllTaxPayers() : async [TaxPayer] {
    return Iter.toArray(taxPayers.vals());
  };

  // Get a TaxPayer by TID
  public query func getTaxPayerByTID(tid: Text) : async ?TaxPayer {
    return taxPayers.get(tid);
  };

  // Update a TaxPayer record
  public func updateTaxPayer(tid: Text, firstName: Text, lastName: Text, address: Text) : async Bool {
    switch (taxPayers.get(tid)) {
      case (null) { return false; };
      case (?existingTaxPayer) {
        let updatedTaxPayer : TaxPayer = {
          tid = tid;
          firstName = firstName;
          lastName = lastName;
          address = address;
        };
        taxPayers.put(tid, updatedTaxPayer);
        return true;
      };
    };
  };
}
