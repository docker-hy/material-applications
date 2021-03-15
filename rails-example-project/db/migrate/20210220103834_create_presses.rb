class CreatePresses < ActiveRecord::Migration[6.1]
  def change
    create_table :presses do |t|

      t.timestamps
    end
  end
end
