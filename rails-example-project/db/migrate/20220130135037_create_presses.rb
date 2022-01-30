class CreatePresses < ActiveRecord::Migration[7.0]
  def change
    create_table :presses do |t|

      t.timestamps
    end
  end
end
