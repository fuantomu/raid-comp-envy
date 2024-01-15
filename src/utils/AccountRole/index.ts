import { FunctionAccountRole } from "../../consts";

export const isAccountRoleAllowed = (accountRole, functionName) => {
  const accountRoleDefinition = FunctionAccountRole[functionName];
  if(accountRoleDefinition){
    return accountRoleDefinition.includes(accountRole)
  }
  return false
}
